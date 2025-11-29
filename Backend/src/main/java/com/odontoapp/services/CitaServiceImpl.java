package com.odontoapp.services;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;
import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Tratamiento;
import com.odontoapp.entity.Usuario;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.mappers.CitaMapper;
import com.odontoapp.repositories.CitaRepository;
import com.odontoapp.repositories.TratamientoRepository;
import com.odontoapp.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final UsuarioRepository usuarioRepository;
    private final TratamientoRepository tratamientoRepository;
    private final CitaMapper citaMapper;

    private static final LocalTime START_WORK = LocalTime.of(8, 0);
    private static final LocalTime END_WORK = LocalTime.of(18, 0);

    @Override
    @Transactional
    public CitaDTO crearCita(CreateCitaRequest request) {

        validateRequestDates(request.getFecha(), request.getHora());

        Usuario paciente = usuarioRepository.findById(request.getIdPaciente())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado"));

        Usuario odontologo = usuarioRepository.findById(request.getIdOdontologo())
                .orElseThrow(() -> new ResourceNotFoundException("Odontólogo no encontrado"));

        if (!isPacienteRole(String.valueOf(paciente.getRol()))) {
            throw new BadRequestException("Usuario paciente no tiene rol de paciente");
        }

        if (!isOdontologoRole(String.valueOf(odontologo.getRol()))) {
            throw new BadRequestException("Usuario odontólogo no tiene rol de odontólogo");
        }

        Tratamiento tratamiento = tratamientoRepository.findById(request.getIdTratamiento())
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento no encontrado"));

        Set<Tratamiento> tratamientos = new HashSet<>();
        tratamientos.add(tratamiento);

        Cita cita = Cita.builder()
                .paciente(paciente)
                .odontologo(odontologo)
                .fecha(request.getFecha())
                .hora(request.getHora())
                .motivo(request.getComentario())
                .estado("pendiente")
                .tratamientos(tratamientos)
                .build();

        Cita saved = citaRepository.save(cita);
        return citaMapper.toDto(saved);
    }

    @Override
    public CitaDTO obtenerPorId(Integer id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada"));
        return citaMapper.toDto(cita);
    }

    @Override
    public List<CitaDTO> listarTodas() {
        return citaRepository.findAll().stream()
                .map(citaMapper::toDto)
                .toList();
    }

    @Override
    public List<CitaDTO> listarPorPaciente(Integer pacienteId) {
        return citaRepository.findByPacienteIdUsuario(pacienteId).stream()
                .map(citaMapper::toDto)
                .toList();
    }

    @Override
    public List<CitaDTO> listarPorOdontologo(Integer medicoId) {
        return citaRepository.findByOdontologoIdUsuario(medicoId).stream()
                .map(citaMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public CitaDTO reprogramarCita(Integer id, CreateCitaRequest request) {
        System.out.println("📥 CREATE_CITA Request:");
        System.out.println("  idPaciente: " + request.getIdPaciente());
        System.out.println("  idOdontologo: " + request.getIdOdontologo());
        System.out.println("  fecha: " + request.getFecha());
        System.out.println("  hora: " + request.getHora());
        System.out.println("  comentario: " + request.getComentario());
        System.out.println("  idTratamiento: " + request.getIdTratamiento());

        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada"));

        validateRequestDates(request.getFecha(), request.getHora());

        if ("realizada".equalsIgnoreCase(cita.getEstado()) ||
                "cancelada".equalsIgnoreCase(cita.getEstado())) {
            throw new BadRequestException("No se puede reprogramar una cita realizada o cancelada");
        }

        cita.setFecha(request.getFecha());
        cita.setHora(request.getHora());
        cita.setMotivo(request.getComentario());

        Tratamiento tratamiento = tratamientoRepository.findById(request.getIdTratamiento())
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento no encontrado"));

        Set<Tratamiento> tratamientos = new HashSet<>();
        tratamientos.add(tratamiento);

        cita.setTratamientos(tratamientos);

        Cita saved = citaRepository.save(cita);
        return citaMapper.toDto(saved);
    }

    @Override
    @Transactional
    public CitaDTO cancelarCita(Integer id) {

        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada"));

        if ("cancelada".equalsIgnoreCase(cita.getEstado())) {
            throw new BadRequestException("La cita ya está cancelada");
        }

        cita.setEstado("cancelada");
        Cita saved = citaRepository.save(cita);

        return citaMapper.toDto(saved);
    }

    // ---------- Helpers ----------

    private void validateRequestDates(LocalDate fecha, LocalTime hora) {
        if (fecha == null || hora == null) {
            throw new BadRequestException("Fecha y hora son obligatorias");
        }

        LocalDate today = LocalDate.now();

        if (fecha.isBefore(today)) {
            throw new BadRequestException("No se pueden crear citas en el pasado");
        }

        if (fecha.isEqual(today)) {
            LocalTime now = LocalTime.now();
            if (!hora.isAfter(now)) {
                throw new BadRequestException("La hora debe ser futura si la fecha es hoy");
            }
        }

        if (hora.isBefore(START_WORK) || !hora.isBefore(END_WORK)) {
            throw new BadRequestException("La hora debe estar entre 08:00 (incl) y 18:00 (excl)");
        }
    }

    private boolean isPacienteRole(String rol) {
        return rol != null && rol.equalsIgnoreCase("paciente");
    }

    private boolean isOdontologoRole(String rol) {
        return rol != null &&
                (rol.equalsIgnoreCase("odontologo")
                        || rol.equalsIgnoreCase("odontólogo")
                        || rol.equalsIgnoreCase("medico")
                );
    }
}

package com.odontoapp.services;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;
import com.odontoapp.dto.user.OdontologoDTO;
import com.odontoapp.dto.user.UsuarioResponseDTO;
import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Odontologo;
import com.odontoapp.entity.Tratamiento;
import com.odontoapp.entity.Usuario;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.mappers.CitaMapper;
import com.odontoapp.repositories.CitaRepository;
import com.odontoapp.repositories.OdontologoRepository;
import com.odontoapp.repositories.TratamientoRepository;
import com.odontoapp.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final UsuarioRepository usuarioRepository;
    private final OdontologoRepository odontologoRepository;
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

        // 🔥 VALIDAR LISTA DE TRATAMIENTOS
        if (request.getTratamientosIds() == null || request.getTratamientosIds().isEmpty()) {
            throw new BadRequestException("Debe seleccionar al menos un tratamiento");
        }

        // 🔥 OBTENER TODOS LOS TRATAMIENTOS
        Set<Tratamiento> tratamientos = new HashSet<>(
                tratamientoRepository.findAllById(request.getTratamientosIds())
        );

        if (tratamientos.isEmpty()) {
            throw new ResourceNotFoundException("Tratamientos no encontrados");
        }
        if (tratamientos.size() != request.getTratamientosIds().size()) {
            throw new BadRequestException("Uno o más tratamientos no existen");
        }


        // 🔥 VALIDACIÓN POR RANGO (IGNORA CANCELADAS)
        List<Cita> citas = citaRepository
                .findByOdontologoIdUsuarioAndFechaAndEstadoNot(
                        request.getIdOdontologo(),
                        request.getFecha(),
                        "cancelada"
                );

        int duracionTotal = tratamientos.stream()
                .mapToInt(Tratamiento::getDuracionMinutos)
                .sum();

        LocalTime nuevaInicio = request.getHora();
        LocalTime nuevaFin = nuevaInicio.plusMinutes(duracionTotal);

        // 🔥 VALIDAR SOLAPAMIENTO
        for (Cita c : citas) {

            int duracionExistente = c.getTratamientos().stream()
                    .mapToInt(Tratamiento::getDuracionMinutos)
                    .sum();

            LocalTime existenteInicio = c.getHora();
            LocalTime existenteFin = existenteInicio.plusMinutes(duracionExistente);

            boolean hayCruce =
                    nuevaInicio.isBefore(existenteFin) &&
                            nuevaFin.isAfter(existenteInicio);

            if (hayCruce) {
                throw new BadRequestException("El odontólogo ya tiene una cita en ese rango de horario");
            }
        }
        // 🚨 Validar que no se pase del horario laboral
        if (nuevaFin.isAfter(END_WORK)) {
            throw new BadRequestException("La cita excede el horario laboral");
        }

        List<Cita> citasPaciente = citaRepository
                .findByPacienteIdUsuarioAndFechaAndEstadoNot(
                        request.getIdPaciente(),
                        request.getFecha(),
                        "cancelada"
                );

        for (Cita c : citasPaciente) {

            int duracionExistente = c.getTratamientos().stream()
                    .mapToInt(Tratamiento::getDuracionMinutos)
                    .sum();

            LocalTime existenteInicio = c.getHora();
            LocalTime existenteFin = existenteInicio.plusMinutes(duracionExistente);

            boolean hayCruce =
                    nuevaInicio.isBefore(existenteFin) &&
                            nuevaFin.isAfter(existenteInicio);

            if (hayCruce) {
                throw new BadRequestException("El paciente ya tiene una cita en ese rango de horario");
            }
        }

        Cita cita = Cita.builder()
                .paciente(paciente)
                .odontologo(odontologo)
                .fecha(request.getFecha())
                .hora(request.getHora())
                .motivo(request.getMotivo()) // ✅ CORREGIDO
                .estado("pendiente")
                .tratamientos(tratamientos) // ✅ SET COMPLETO
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

        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cita no encontrada"));

        validateRequestDates(request.getFecha(), request.getHora());

        if ("realizada".equalsIgnoreCase(cita.getEstado()) ||
                "cancelada".equalsIgnoreCase(cita.getEstado())) {
            throw new BadRequestException("No se puede reprogramar una cita realizada o cancelada");
        }

        cita.setFecha(request.getFecha());
        cita.setHora(request.getHora());
        cita.setMotivo(request.getMotivo()); // ✅ CORREGIDO


        // 🔥 ACTUALIZAR TRATAMIENTOS
        if (request.getTratamientosIds() != null && !request.getTratamientosIds().isEmpty()) {

            Set<Tratamiento> tratamientos = new HashSet<>(
                    tratamientoRepository.findAllById(request.getTratamientosIds())
            );

            cita.setTratamientos(tratamientos);
        }

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

    public List<OdontologoDTO> obtenerOdontologosDisponibles(Integer tratamientoId) {

        Tratamiento tratamiento = tratamientoRepository.findById(tratamientoId)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento no encontrado"));

        String nombreTratamiento = tratamiento.getNombre().toLowerCase();

        List<Odontologo> odontologos = odontologoRepository.findAll();

        // 🔹 Tratamientos generales → TODOS
        if (nombreTratamiento.contains("limpieza") ||
                nombreTratamiento.contains("examen")) {

            return odontologos.stream()
                    .map(this::mapToDto)
                    .toList();
        }

        // 🔹 Tratamientos especializados → FILTRAR
        return odontologos.stream()
                .filter(o -> {
                    String especialidad = o.getEspecialidad() != null
                            ? o.getEspecialidad().toLowerCase()
                            : "";

                    return especialidad.contains(nombreTratamiento);
                })
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<LocalTime> obtenerHorariosDisponibles(Integer odontologoId, LocalDate fecha) {

        List<Cita> citas = citaRepository
                .findByOdontologoIdUsuarioAndFecha(odontologoId, fecha);

        Set<LocalTime> horasOcupadas = citas.stream()
                .map(Cita::getHora)
                .collect(Collectors.toSet());

        List<LocalTime> disponibles = new ArrayList<>();

        LocalTime inicio = LocalTime.of(8, 0);
        LocalTime fin = LocalTime.of(18, 0);

        while (inicio.isBefore(fin)) {
            if (!horasOcupadas.contains(inicio)) {
                disponibles.add(inicio);
            }
            inicio = inicio.plusMinutes(30); // 🔥 intervalos de 30 min
        }

        return disponibles;
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

    private OdontologoDTO mapToDto(Odontologo o) {
        return OdontologoDTO.builder()
                .idUsuario(o.getUsuario().getIdUsuario())
                .usuario(
                        UsuarioResponseDTO.builder()
                                .nombre(o.getUsuario().getNombres())
                                .apellido(o.getUsuario().getApellidos())
                                .build()
                )
                .especialidad(o.getEspecialidad())
                .numeroLicencia(o.getNumeroLicencia())
                .trayectoriaProfesional(o.getTrayectoriaProfesional())
                .build();
    }
}

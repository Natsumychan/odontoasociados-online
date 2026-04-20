package com.odontoapp.services;

import com.odontoapp.dto.user.AdministradorDTO;
import com.odontoapp.dto.user.RecepcionistaDTO;
import com.odontoapp.dto.user.UsuarioCompletoDTO;
import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.dto.user.UsuarioCompletoUpdateDTO;
import com.odontoapp.entity.*;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.mappers.AdministradorMapper;
import com.odontoapp.mappers.OdontologoMapper;
import com.odontoapp.mappers.PacienteMapper;
import com.odontoapp.mappers.RecepcionistaMapper;
import com.odontoapp.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UsuarioRepository usuarioRepo;
    private final RecepcionistaRepository recepcionistaRepo;
    private final OdontologoRepository odontologoRepo;
    private final PacienteRepository pacienteRepo;
    private final PasswordEncoder passwordEncoder;
    private final RecepcionistaService recepcionistaService;
    private final AdministradorRepository adminRepo;
    private final PacienteMapper pacienteMapper;
    private final OdontologoMapper odontologoMapper;
    private final RecepcionistaMapper recepcionistaMapper;
    private final AdministradorMapper administradorMapper;

    @Transactional
    public AdministradorDTO actualizar(Integer id, AdministradorDTO dto) {

        Administrador admin = adminRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administrador no encontrado"));

        admin.setAreaCargo(dto.getAreaCargo());
        admin.setNivelAcceso(dto.getNivelAcceso());

        adminRepo.save(admin);

        return dto;
    }

    @Transactional
    public void crearRecepcionista(UsuarioRequestDTO userDto, RecepcionistaDTO dto) {

        if(usuarioRepo.existsByDocumento(userDto.getDocumento())){
            throw new BadRequestException("cédula ya registrada");
        }


        Usuario usuario = Usuario.builder()
                .nombreUsuario(userDto.getNombre())
                .clave(passwordEncoder.encode(userDto.getPassword()))
                .rol(Rol.recepcionista)
                .nombres(userDto.getNombre())
                .apellidos(userDto.getApellido())
                .documento(userDto.getDocumento())
                .correo(userDto.getEmail())
                .telefono(userDto.getTelefono())
                .fechaRegistro(LocalDate.now())
                .build();

        Usuario saved = usuarioRepo.save(usuario);

        Recepcionista r = Recepcionista.builder()
                .usuario(saved)
                .turno(convertirTurno(dto.getTurno()))
                .oficina(dto.getOficina())
                .build();

        recepcionistaRepo.save(r);
    }

    public RecepcionistaDTO actualizarRecepcionista(Integer id, RecepcionistaDTO dto) {
        return recepcionistaService.actualizar(id, dto);
    }

    public UsuarioCompletoDTO obtenerUsuarioCompleto(Integer id) {

        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        UsuarioCompletoDTO dto = UsuarioCompletoDTO.builder()
                .id(usuario.getIdUsuario())
                .nombre(usuario.getNombres())
                .apellido(usuario.getApellidos())
                .documento(usuario.getDocumento())
                .telefono(usuario.getTelefono())
                .email(usuario.getCorreo())
                .rol(usuario.getRol().name())
                .password(usuario.getClave())
                .build();

        switch (usuario.getRol()) {

            case odontologo:
                odontologoRepo.findById(id)
                        .ifPresent(o -> dto.setOdontologo(odontologoMapper.toDto(o)));
                break;

            case paciente:
                pacienteRepo.findById(id)
                        .ifPresent(p -> dto.setPaciente(pacienteMapper.toDto(p)));
                break;

            case recepcionista:
                recepcionistaRepo.findById(id)
                        .ifPresent(r -> dto.setRecepcionista(recepcionistaMapper.toDto(r)));
                break;

            case administrador:
                adminRepo.findById(id)
                        .ifPresent(a -> dto.setAdministrador(administradorMapper.toDto(a)));
                break;
        }

        return dto;
    }

    @Transactional
    public void actualizarUsuarioCompleto(Integer id, UsuarioCompletoUpdateDTO dto) {

        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        // 🔵 ACTUALIZAR USUARIO BASE
        usuario.setNombres(dto.getNombre());
        usuario.setApellidos(dto.getApellido());
        usuario.setCorreo(dto.getEmail());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDocumento(dto.getDocumento());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setClave(passwordEncoder.encode(dto.getPassword()));
        }

        usuario.setRol(Rol.valueOf(dto.getRol()));

        usuarioRepo.save(usuario);

        // 🔴 SEGÚN ROL
        switch (usuario.getRol()) {

            case odontologo:
                Odontologo o= odontologoRepo.findById(id)
                        .orElse(new Odontologo());

                o.setUsuario(usuario);
                o.setEspecialidad(dto.getEspecialidad());
                o.setNumeroLicencia(dto.getNumeroLicencia());
                o.setTrayectoriaProfesional(dto.getTrayectoriaProfesional());

                odontologoRepo.save(o);
                break;

            case recepcionista:
                Recepcionista r = recepcionistaRepo.findById(id)
                        .orElse(new Recepcionista());

                r.setUsuario(usuario);
                r.setTurno(convertirTurno(dto.getTurno()));
                r.setOficina(dto.getOficina());

                recepcionistaRepo.save(r);
                break;

            case paciente:
                Paciente p = pacienteRepo.findById(id)
                        .orElse(new Paciente());

                p.setUsuario(usuario);
                p.setGrupoSanguineo(dto.getGrupoSanguineo());
                p.setEps(dto.getEps());
                p.setAlergias(dto.getAlergias());
                p.setMedicamentoAlergias(dto.getMedicamentoAlergias());

                pacienteRepo.save(p);
                break;

            case administrador:
                Administrador a = adminRepo.findById(id)
                        .orElse(new Administrador());

                a.setUsuario(usuario);
                a.setAreaCargo(dto.getAreaCargo());
                a.setNivelAcceso(dto.getNivelAcceso());

                adminRepo.save(a);
                break;
        }
    }

    // Helpers
    private Turno convertirTurno(String turno) {
        if (turno == null) return null;

        try {
            return Turno.valueOf(
                    turno.trim()
                            .toLowerCase()
                            .replace("ñ", "n")
            );
        } catch (Exception e) {
            throw new BadRequestException("Turno inválido: " + turno);
        }
    }

}

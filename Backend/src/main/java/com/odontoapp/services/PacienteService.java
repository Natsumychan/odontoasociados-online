package com.odontoapp.services;

import com.odontoapp.dto.user.PacienteDTO;
import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.entity.Paciente;
import com.odontoapp.entity.Rol;
import com.odontoapp.entity.Usuario;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.mappers.PacienteMapper;
import com.odontoapp.mappers.UsuarioMapper;
import com.odontoapp.repositories.PacienteRepository;
import com.odontoapp.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final UsuarioRepository usuarioRepo;
    private final PacienteRepository pacienteRepo;
    private final PasswordEncoder passwordEncoder;
    private final PacienteMapper pacienteMapper;
    private final UsuarioMapper usuarioMapper;

    public PacienteDTO crearPacienteConUsuario(UsuarioRequestDTO createUserDto, PacienteDTO pacienteDto) {
        // 1. validar existencia
        if (usuarioRepo.existsByNombreUsuario(createUserDto.getNombre())) {
            throw new BadRequestException("nombre de usuario ya existe");
        }
        if (usuarioRepo.existsByCorreo(createUserDto.getEmail())) {
            throw new BadRequestException("correo ya registrado");
        }

        // 2. crear Usuario
        Usuario user = Usuario.builder()
                .nombreUsuario(createUserDto.getNombre())
                .clave(passwordEncoder.encode(createUserDto.getPassword()))
                .rol(Rol.valueOf(createUserDto.getRol()))
                .nombres(createUserDto.getNombre())
                .apellidos(createUserDto.getApellido())
                .documento(createUserDto.getDocumento())
                .correo(createUserDto.getEmail())
                .telefono(createUserDto.getTelefono())
                .fechaRegistro(LocalDate.now())
                .build();
        Usuario savedUser = usuarioRepo.save(user);

        // 3. crear Paciente vinculando el Usuario (MapsId)
        Paciente paciente = Paciente.builder()
                .usuario(savedUser)
                .grupoSanguineo(pacienteDto.getGrupoSanguineo())
                .alergias(pacienteDto.getAlergias())
                .enfermedadesPrevias(pacienteDto.getEnfermedadesPrevias())
                .build();

        // cuando salve paciente, MapsId hará que id_usuario se ponga igual al id del usuario
        Paciente savedPaciente = pacienteRepo.save(paciente);

        return pacienteMapper.toDto(savedPaciente);
    }

    // otros métodos: getById, updatePaciente, deletePaciente...
}
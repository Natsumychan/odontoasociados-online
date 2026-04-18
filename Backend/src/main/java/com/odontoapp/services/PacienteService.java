package com.odontoapp.services;

import com.odontoapp.dto.user.PacienteDTO;
import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.entity.Paciente;
import com.odontoapp.entity.Rol;
import com.odontoapp.entity.Usuario;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.mappers.PacienteMapper;
import com.odontoapp.mappers.UsuarioMapper;
import com.odontoapp.repositories.PacienteRepository;
import com.odontoapp.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final UsuarioRepository usuarioRepo;
    private final PacienteRepository pacienteRepo;
    private final PasswordEncoder passwordEncoder;
    private final PacienteMapper pacienteMapper;
    private final UsuarioMapper usuarioMapper;

    @Transactional
    public PacienteDTO crearPacienteConUsuario(UsuarioRequestDTO createUserDto, PacienteDTO pacienteDto) {
        if(usuarioRepo.existsByDocumento(createUserDto.getDocumento())){
            throw new BadRequestException("cédula ya registrada");
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
                .medicamentoAlergias(pacienteDto.getMedicamentoAlergias())
                .eps(pacienteDto.getEps())
                .build();

        // cuando salve paciente, MapsId hará que id_usuario se ponga igual al id del usuario
        Paciente savedPaciente = pacienteRepo.save(paciente);

        return pacienteMapper.toDto(savedPaciente);
    }

    @Transactional
    public PacienteDTO actualizarPaciente(Integer id, PacienteDTO dto) {

        Paciente paciente = pacienteRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente no encontrado"));

        paciente.setGrupoSanguineo(dto.getGrupoSanguineo());
        paciente.setAlergias(dto.getAlergias());
        paciente.setMedicamentoAlergias(dto.getMedicamentoAlergias());
        paciente.setEps(dto.getEps());

        return pacienteMapper.toDto(pacienteRepo.save(paciente));
    }

    // otros métodos: getById, updatePaciente, deletePaciente...
}
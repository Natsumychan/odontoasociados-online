package com.odontoapp.services;

import com.odontoapp.dto.user.*;
import com.odontoapp.entity.Rol;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.entity.Odontologo;
import com.odontoapp.entity.Usuario;
import com.odontoapp.mappers.OdontologoMapper;
import com.odontoapp.mappers.UsuarioMapper;
import com.odontoapp.repositories.OdontologoRepository;
import com.odontoapp.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OdontologoServiceImpl implements OdontologoService {

    private final OdontologoRepository odontologoRepository;
    private final UsuarioRepository usuarioRepository;
    private final OdontologoMapper odontologoMapper;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;



    @Transactional
    public OdontologoDTO crearOdontologoConUsuario(UsuarioRequestDTO createUserDto, OdontologoDTO odontologoDto) {

        if(usuarioRepository.existsByDocumento(createUserDto.getDocumento())){
            throw new BadRequestException("cédula ya registrada");
        }


        // crear Usuario
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
        Usuario savedUser = usuarioRepository.save(user);

        Odontologo odontologo = Odontologo.builder()
                .usuario(savedUser)
                .especialidad(odontologoDto.getEspecialidad())
                .numeroLicencia(odontologoDto.getNumeroLicencia())
                .trayectoriaProfesional(odontologoDto.getTrayectoriaProfesional())
                .build();

        Odontologo saved = odontologoRepository.save(odontologo);
        return odontologoMapper.toDto(saved);
    }

    @Override
    @Transactional
    public OdontologoDTO crearOdontologoVinculado(CreateOdontologoLinkUserRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (odontologoRepository.existsByUsuario_IdUsuario(request.getUserId())) {
            throw new BadRequestException("Ya existe un médico vinculado a este usuario");
        }

        Odontologo o = Odontologo.builder()
                .usuario(usuario)
                .especialidad(request.getEspecialidad())
                .numeroLicencia(request.getNumeroLicencia())
                .trayectoriaProfesional(request.getTrayectoriaProfesional())
                .build();

        return odontologoMapper.toDto(odontologoRepository.save(o));
    }

    @Override
    public OdontologoDTO obtenerPorId(Integer id) {
        Odontologo o = odontologoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Médico no encontrado"));
        return odontologoMapper.toDto(o);
    }

    @Override
    public List<OdontologoDTO> listarTodos() {
        return odontologoRepository.findAll().stream()
                .map(odontologoMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public OdontologoDTO actualizar(Integer id, OdontologoDTO dto) {
        Odontologo o = odontologoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Médico no encontrado"));

        o.setEspecialidad(dto.getEspecialidad());
        o.setNumeroLicencia(dto.getNumeroLicencia());
        o.setTrayectoriaProfesional(dto.getTrayectoriaProfesional());

        if (dto.getUsuario() != null) {
            UsuarioResponseDTO u = dto.getUsuario();
            Usuario usuario = o.getUsuario();
            usuario.setNombres(u.getNombre());
            usuario.setApellidos(u.getApellido());
            usuario.setTelefono(u.getTelefono());
            usuario.setCorreo(u.getEmail());
            usuarioRepository.save(usuario);
        }

        return odontologoMapper.toDto(odontologoRepository.save(o));
    }

    @Override
    @Transactional
    public void eliminar(Integer id) {
        if (!odontologoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Médico no encontrado");
        }

        odontologoRepository.deleteById(id);
    }
}
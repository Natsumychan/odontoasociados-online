package com.odontoapp.services;

import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.dto.user.UsuarioResponseDTO;
import com.odontoapp.entity.Usuario;
import com.odontoapp.mappers.UsuarioMapper;
import com.odontoapp.repositories.UsuarioRepository;

import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.exception.BadRequestException;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;
    private final UsuarioMapper mapper;
    private final PasswordEncoder passwordEncoder; // para seguridad real con JWT

    @Override
    public UsuarioResponseDTO crearUsuario(UsuarioRequestDTO dto) {
        if (repository.existsByCorreo(dto.getEmail())) {
            throw new BadRequestException("El email ya está registrado.");
        }

        Usuario usuario = mapper.toEntity(dto);
        usuario.setClave(passwordEncoder.encode(dto.getPassword()));

        return mapper.toResponse(repository.save(usuario));
    }

    @Override
    public UsuarioResponseDTO obtenerPorId(Integer id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return mapper.toResponse(usuario);
    }

    @Override
    public List<UsuarioResponseDTO> listarTodos() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Override
    public UsuarioResponseDTO actualizarUsuario(Integer id, UsuarioRequestDTO dto) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        mapper.updateEntityFromDto(dto, usuario);

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setClave(passwordEncoder.encode(dto.getPassword()));
        }

        return mapper.toResponse(repository.save(usuario));
    }

    @Override
    public void eliminarUsuario(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado");
        }

        repository.deleteById(id);
    }
}

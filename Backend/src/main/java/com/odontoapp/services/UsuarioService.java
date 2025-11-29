package com.odontoapp.services;

import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.dto.user.UsuarioResponseDTO;

import java.util.List;

public interface UsuarioService {

    UsuarioResponseDTO crearUsuario(UsuarioRequestDTO dto);

    UsuarioResponseDTO obtenerPorId(Integer id);

    List<UsuarioResponseDTO> listarTodos();

    UsuarioResponseDTO actualizarUsuario(Integer id, UsuarioRequestDTO dto);

    void eliminarUsuario(Integer id);
}
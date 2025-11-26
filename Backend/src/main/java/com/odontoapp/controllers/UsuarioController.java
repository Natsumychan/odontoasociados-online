package com.odontoapp.controllers;

import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.dto.user.UsuarioResponseDTO;
import com.odontoapp.services.UsuarioService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;

    @PostMapping
    public UsuarioResponseDTO crear(@RequestBody UsuarioRequestDTO dto) {
        return service.crearUsuario(dto);
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO obtener(@PathVariable Integer id) {
        return service.obtenerPorId(id);
    }

    @GetMapping
    public List<UsuarioResponseDTO> listar() {
        return service.listarTodos();
    }

    @PutMapping("/{id}")
    public UsuarioResponseDTO actualizar(@PathVariable Integer id, @RequestBody UsuarioRequestDTO dto) {
        return service.actualizarUsuario(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminarUsuario(id);
    }
}

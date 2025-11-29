package com.odontoapp.controllers;

import com.odontoapp.dto.auth.*;
import com.odontoapp.entity.Usuario;
import com.odontoapp.repositories.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Usuario user = usuarioRepo.findByCorreo(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // ⚠️ Solo temporal: comparar texto plano
        if (!request.getPassword().equals("123456")) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Retornamos un login simulado
        return new LoginResponse(
                "fake-token",
                user.getRol().name()
        );
    }
}

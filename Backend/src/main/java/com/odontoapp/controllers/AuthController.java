package com.odontoapp.controllers;

import com.odontoapp.dto.auth.*;
import com.odontoapp.entity.Usuario;
import com.odontoapp.repositories.UsuarioRepository;

import com.odontoapp.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Usuario user = usuarioRepo.findByDocumento(request.getDocumento())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        System.out.println("NOMBRES: " + user.getNombres());
        System.out.println("APELLIDOS: " + user.getApellidos());

        // 🔐 Validar contraseña encriptada
        if (!passwordEncoder.matches(request.getPassword(), user.getClave())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(
                user.getDocumento(),
                user.getRol().name()
        );

        // Retornamos un login
        return new LoginResponse(
                token,
                user.getRol().name(),
                user.getNombres(),
                user.getIdUsuario()
        );

    }
}

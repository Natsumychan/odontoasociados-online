package com.odontoapp.controllers;

import com.odontoapp.dto.auth.*;
import com.odontoapp.entity.Usuario;
import com.odontoapp.repositories.UsuarioRepository;
import com.odontoapp.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        Usuario user = usuarioRepo.findByNombreUsuario(request.getUsername())
                .orElseThrow();

        String token = jwtUtil.generateToken(user.getNombreUsuario(), user.getRol().name());

        return new LoginResponse(token, user.getRol().name());
    }
}

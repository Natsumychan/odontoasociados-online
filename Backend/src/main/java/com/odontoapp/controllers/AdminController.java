package com.odontoapp.controllers;

import com.odontoapp.dto.user.*;
import com.odontoapp.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/usuarios-completo/{id}")
    public ResponseEntity<UsuarioCompletoDTO> obtenerCompleto(@PathVariable Integer id) {
        return ResponseEntity.ok(adminService.obtenerUsuarioCompleto(id));
    }

    @PostMapping("/recepcionistas")
    public ResponseEntity<Void> crearRecepcionista(@RequestBody CreateRecepcionistaRequest request) {
        adminService.crearRecepcionista(request.getUsuario(), request.getRecepcionista());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/recepcionistas/{id}")
    public ResponseEntity<RecepcionistaDTO> actualizarRecepcionista(
            @PathVariable Integer id,
            @RequestBody RecepcionistaDTO dto) {

        return ResponseEntity.ok(adminService.actualizarRecepcionista(id, dto));
    }

    @PutMapping("/administradores/{id}")
    public ResponseEntity<AdministradorDTO> actualizarAdministrador(
            @PathVariable Integer id,
            @RequestBody AdministradorDTO dto) {

        return ResponseEntity.ok(adminService.actualizar(id, dto));
    }

    @PutMapping("/usuarios-completo/{id}")
    public ResponseEntity<Void> actualizarCompleto(
            @PathVariable Integer id,
            @RequestBody UsuarioCompletoUpdateDTO dto) {

        adminService.actualizarUsuarioCompleto(id, dto);
        return ResponseEntity.noContent().build();
    }
}
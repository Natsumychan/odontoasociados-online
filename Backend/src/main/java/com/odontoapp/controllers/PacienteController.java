package com.odontoapp.controllers;

import com.odontoapp.dto.user.CreatePacienteRequest;
import com.odontoapp.dto.user.PacienteDTO;
import com.odontoapp.services.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteDTO> crearConUsuario(
            @RequestBody CreatePacienteRequest request) {
        PacienteDTO dto = pacienteService.crearPacienteConUsuario(request.getUsuario(), request.getPaciente());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteDTO> actualizar(
            @PathVariable Integer id,
            @RequestBody PacienteDTO dto) {

        return ResponseEntity.ok(pacienteService.actualizarPaciente(id, dto));
    }
}
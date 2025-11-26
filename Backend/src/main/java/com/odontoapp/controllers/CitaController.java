package com.odontoapp.controllers;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;
import com.odontoapp.services.CitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CitaController {

    private final CitaService citaService;

    @PostMapping
    public ResponseEntity<CitaDTO> crear(@RequestBody CreateCitaRequest req) {
        CitaDTO created = citaService.crearCita(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CitaDTO> obtener(@PathVariable Integer id) {
        return ResponseEntity.ok(citaService.obtenerPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<CitaDTO>> listarTodas() {
        return ResponseEntity.ok(citaService.listarTodas());
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<CitaDTO>> listarPorPaciente(@PathVariable Integer pacienteId) {
        return ResponseEntity.ok(citaService.listarPorPaciente(pacienteId));
    }

    @GetMapping("/odontologo/{odontologoId}")
    public ResponseEntity<List<CitaDTO>> listarPorOdontologo(@PathVariable Integer medicoId) {
        return ResponseEntity.ok(citaService.listarPorOdontologo(medicoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitaDTO> reprogramar(@PathVariable Integer id, @RequestBody CreateCitaRequest req) {
        return ResponseEntity.ok(citaService.reprogramarCita(id, req));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<CitaDTO> cancelar(@PathVariable Integer id) {
        return ResponseEntity.ok(citaService.cancelarCita(id));
    }
}
package com.odontoapp.controllers;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;
import com.odontoapp.dto.user.OdontologoDTO;
import com.odontoapp.services.CitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
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

    @GetMapping("/odontologos/disponibles/{tratamientoId}")
    public ResponseEntity<List<OdontologoDTO>> obtenerOdontologosDisponibles(
            @PathVariable Integer tratamientoId) {

        return ResponseEntity.ok(
                citaService.obtenerOdontologosDisponibles(tratamientoId)
        );
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<String>> obtenerHorariosDisponibles(
            @RequestParam Integer odontologoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            @RequestParam List<Integer> tratamientosIds
    ) {

        List<LocalTime> horarios = citaService.obtenerHorariosDisponibles(
                odontologoId,
                fecha,
                tratamientosIds
        );

        List<String> response = horarios.stream()
                .map(h -> h.toString().substring(0, 5)) // HH:mm
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/agenda-dia")
    public List<CitaDTO> agendaDia(
            @RequestParam Integer odontologoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha
    ) {
        return citaService.obtenerAgendaDia(odontologoId, fecha);
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
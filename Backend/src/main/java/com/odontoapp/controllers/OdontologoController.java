package com.odontoapp.controllers;

import com.odontoapp.dto.user.*;
import com.odontoapp.services.OdontologoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OdontologoController {

    private final OdontologoService odontologoService;

    /**
     * Crear odontólogo vinculando a un usuario existente
     * POST /api/odontologos/link
     */
    @PostMapping("/link")
    public ResponseEntity<OdontologoDTO> crearVinculado(@RequestBody CreateOdontologoLinkUserRequest request) {
        OdontologoDTO created = odontologoService.crearOdontologoVinculado(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Crear médico junto a la cuenta de usuario (crea usuario + medico)
     * POST /api/medicos
     */
    @PostMapping
    public ResponseEntity<OdontologoDTO> crearConUsuario(@RequestBody CreateOdontologoWithUserRequest request) {
        OdontologoDTO created = odontologoService.crearOdontologoConUsuario(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologoDTO> obtener(@PathVariable Integer id) {
        return ResponseEntity.ok(odontologoService.obtenerPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<OdontologoDTO>> listar() {
        return ResponseEntity.ok(odontologoService.listarTodos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<OdontologoDTO> actualizar(@PathVariable Integer id, @RequestBody OdontologoDTO dto) {
        return ResponseEntity.ok(odontologoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        odontologoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

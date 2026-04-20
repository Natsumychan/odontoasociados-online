package com.odontoapp.services;

import com.odontoapp.dto.user.RecepcionistaDTO;
import com.odontoapp.entity.Recepcionista;
import com.odontoapp.entity.Turno;
import com.odontoapp.exception.BadRequestException;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.repositories.RecepcionistaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RecepcionistaService {
    private final RecepcionistaRepository recepcionistaRepo;

    @Transactional
    public RecepcionistaDTO actualizar(Integer id, RecepcionistaDTO dto) {

        Recepcionista r = recepcionistaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recepcionista no encontrado"));

        r.setTurno(convertirTurno(dto.getTurno()));
        r.setOficina(dto.getOficina());

        recepcionistaRepo.save(r);

        return dto;
    }

    // Helpers
    private Turno convertirTurno(String turno) {
        if (turno == null) return null;

        try {
            return Turno.valueOf(
                    turno.trim()
                            .toLowerCase()
                            .replace("ñ", "n")
            );
        } catch (Exception e) {
            throw new BadRequestException("Turno inválido: " + turno);
        }
    }
}

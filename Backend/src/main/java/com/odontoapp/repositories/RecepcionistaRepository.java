package com.odontoapp.repositories;

import com.odontoapp.entity.Recepcionista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecepcionistaRepository extends JpaRepository<Recepcionista, Integer> {
    // métodos adicionales si se requieren
}

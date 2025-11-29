package com.odontoapp.repositories;

import com.odontoapp.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    // métodos adicionales si se requieren
}
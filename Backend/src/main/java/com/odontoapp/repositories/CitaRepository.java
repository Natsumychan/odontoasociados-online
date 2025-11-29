package com.odontoapp.repositories;

import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Integer> {

    List<Cita> findByPacienteIdUsuario(Integer pacienteId);

    List<Cita> findByOdontologoIdUsuario(Integer odontologoId);

    List<Cita> findByFecha(LocalDate fecha);

    // Opcional: buscar citas de un paciente en rango de fechas, etc.
    List<Cita> findByPacienteIdUsuarioAndFechaBetween(Integer pacienteId, LocalDate desde, LocalDate hasta);
}
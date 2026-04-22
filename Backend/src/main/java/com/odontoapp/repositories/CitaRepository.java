package com.odontoapp.repositories;

import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita, Integer> {

    List<Cita> findByPacienteIdUsuario(Integer pacienteId);

    List<Cita> findByOdontologoIdUsuario(Integer odontologoId);

    List<Cita> findByFecha(LocalDate fecha);

    List<Cita> findByPacienteIdUsuarioAndEstadoOrderByFechaAscHoraAsc(
            Integer pacienteId,
            String estado
    );

    // Opcional: buscar citas de un paciente en rango de fechas, etc.
    List<Cita> findByPacienteIdUsuarioAndFechaBetween(Integer pacienteId, LocalDate desde, LocalDate hasta);

    List<Cita> findByOdontologoIdUsuarioAndFecha(Integer id, LocalDate fecha);

    List<Cita> findByPacienteIdUsuarioAndFecha(Integer id, LocalDate fecha);
    // 🔎 Validar si odontólogo ya tiene cita en ese horario
    boolean existsByOdontologoIdUsuarioAndFechaAndHora(
            Integer odontologoId,
            LocalDate fecha,
            LocalTime hora
    );

    // 🔎 Validar si paciente ya tiene cita en ese horario
    boolean existsByPacienteIdUsuarioAndFechaAndHora(
            Integer pacienteId,
            LocalDate fecha,
            LocalTime hora
    );

    // (Opcional) ignorar citas canceladas
    boolean existsByOdontologoIdUsuarioAndFechaAndHoraAndEstadoNot(
            Integer odontologoId,
            LocalDate fecha,
            LocalTime hora,
            String estado
    );

    boolean existsByPacienteIdUsuarioAndFechaAndHoraAndEstadoNot(
            Integer pacienteId,
            LocalDate fecha,
            LocalTime hora,
            String estado
    );

    List<Cita> findByOdontologoIdUsuarioAndFechaAndEstadoIn(
            Integer odontologoId,
            LocalDate fecha,
            List<String> estados
    );

    List<Cita> findByPacienteIdUsuarioAndFechaAndEstadoIn(
            Integer pacienteId,
            LocalDate fecha,
            List<String> estados
    );

    List<Cita> findByFechaAndEstadoInOrderByHoraAsc(
            LocalDate fecha,
            List<String> estados
    );

    long countByFecha(LocalDate fecha);

    long countByFechaAndEstado(LocalDate fecha, String estado);

    long countByFechaAndEstadoIn(LocalDate fecha, List<String> estados);

}
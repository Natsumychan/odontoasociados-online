package com.odontoapp.services;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;
import com.odontoapp.dto.user.OdontologoDTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface CitaService {

    CitaDTO crearCita(CreateCitaRequest request);

    CitaDTO obtenerPorId(Integer id);

    List<CitaDTO> listarTodas();

    List<CitaDTO> listarPorPaciente(Integer pacienteId);

    List<CitaDTO> listarPorOdontologo(Integer medicoId);

    List<OdontologoDTO> obtenerOdontologosDisponibles(Integer tratamientoId);

    List<LocalTime> obtenerHorariosDisponibles(Integer odontologoId, LocalDate fecha,  List<Integer> tratamientosIds);

    List<CitaDTO> obtenerAgendaDia(Integer odontologoId, LocalDate fecha);

    CitaDTO reprogramarCita(Integer id, CreateCitaRequest request);

    CitaDTO cancelarCita(Integer id);
}

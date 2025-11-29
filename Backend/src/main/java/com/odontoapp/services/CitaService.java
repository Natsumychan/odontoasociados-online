package com.odontoapp.services;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.dto.data.CreateCitaRequest;

import java.util.List;

public interface CitaService {

    CitaDTO crearCita(CreateCitaRequest request);

    CitaDTO obtenerPorId(Integer id);

    List<CitaDTO> listarTodas();

    List<CitaDTO> listarPorPaciente(Integer pacienteId);

    List<CitaDTO> listarPorOdontologo(Integer medicoId);

    CitaDTO reprogramarCita(Integer id, CreateCitaRequest request);

    CitaDTO cancelarCita(Integer id);
}

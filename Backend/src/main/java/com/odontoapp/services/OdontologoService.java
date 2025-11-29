package com.odontoapp.services;

import com.odontoapp.dto.user.OdontologoDTO;
import com.odontoapp.dto.user.CreateOdontologoWithUserRequest;
import com.odontoapp.dto.user.CreateOdontologoLinkUserRequest;

import java.util.List;

public interface OdontologoService {
    OdontologoDTO crearOdontologoConUsuario(CreateOdontologoWithUserRequest request);

    OdontologoDTO crearOdontologoVinculado(CreateOdontologoLinkUserRequest request);

    OdontologoDTO obtenerPorId(Integer id);

    List<OdontologoDTO> listarTodos();

    OdontologoDTO actualizar(Integer id, OdontologoDTO dto);

    void eliminar(Integer id);
}

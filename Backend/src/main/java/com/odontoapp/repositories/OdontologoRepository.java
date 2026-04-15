package com.odontoapp.repositories;

import com.odontoapp.entity.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OdontologoRepository extends JpaRepository<Odontologo, Integer> {

    // Buscar por número de licencia
    boolean existsByNumeroLicencia(String numeroLicencia);

    // Buscar si existe registro de odontólogo por id de usuario
    boolean existsByUsuario_IdUsuario(Integer idUsuario);

    List<Odontologo> findAll();
}

package com.odontoapp.repositories;

import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Tratamiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TratamientoRepository extends JpaRepository<Tratamiento, Integer> {
}

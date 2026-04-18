package com.odontoapp.services;

import com.odontoapp.dto.user.AdministradorDTO;
import com.odontoapp.dto.user.RecepcionistaDTO;
import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.entity.Administrador;
import com.odontoapp.entity.Recepcionista;
import com.odontoapp.entity.Rol;
import com.odontoapp.entity.Usuario;
import com.odontoapp.exception.ResourceNotFoundException;
import com.odontoapp.repositories.AdministradorRepository;
import com.odontoapp.repositories.OdontologoRepository;
import com.odontoapp.repositories.RecepcionistaRepository;
import com.odontoapp.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UsuarioRepository usuarioRepo;
    private final RecepcionistaRepository recepcionistaRepo;
    private final OdontologoRepository odontologoRepo;
    private final PasswordEncoder passwordEncoder;
    private final RecepcionistaService recepcionistaService;
    private final AdministradorRepository adminRepo;

    @Transactional
    public AdministradorDTO actualizar(Integer id, AdministradorDTO dto) {

        Administrador admin = adminRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administrador no encontrado"));

        admin.setAreaCargo(dto.getAreaCargo());
        admin.setNivelAcceso(dto.getNivelAcceso());

        adminRepo.save(admin);

        return dto;
    }

    @Transactional
    public void crearRecepcionista(UsuarioRequestDTO userDto, RecepcionistaDTO dto) {

        Usuario usuario = Usuario.builder()
                .nombreUsuario(userDto.getNombre())
                .clave(passwordEncoder.encode(userDto.getPassword()))
                .rol(Rol.recepcionista)
                .nombres(userDto.getNombre())
                .apellidos(userDto.getApellido())
                .documento(userDto.getDocumento())
                .correo(userDto.getEmail())
                .telefono(userDto.getTelefono())
                .fechaRegistro(LocalDate.now())
                .build();

        Usuario saved = usuarioRepo.save(usuario);

        Recepcionista r = Recepcionista.builder()
                .usuario(saved)
                .turno(dto.getTurno())
                .oficina(dto.getOficina())
                .build();

        recepcionistaRepo.save(r);
    }

    public RecepcionistaDTO actualizarRecepcionista(Integer id, RecepcionistaDTO dto) {
        return recepcionistaService.actualizar(id, dto);
    }
}

package com.odontoapp.dto.user;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreateOdontologoLinkUserRequest {
    private Integer userId;
    private String especialidad;
    private String numeroLicencia;
    private Integer trayectoriaProfesional;
}

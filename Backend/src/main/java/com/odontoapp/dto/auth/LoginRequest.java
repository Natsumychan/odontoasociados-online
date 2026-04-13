package com.odontoapp.dto.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String documento;
    private String password;
}
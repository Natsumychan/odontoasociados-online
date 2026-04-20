package com.odontoapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class PasswordTest {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void generarPassword() {
        String rawPassword = "";

        String hash = passwordEncoder.encode(rawPassword);

        System.out.println("HASH: " + hash);
    }
}

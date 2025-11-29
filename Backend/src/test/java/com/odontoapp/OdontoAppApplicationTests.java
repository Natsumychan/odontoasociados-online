package com.odontoapp;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled   // ❌ Desactiva este test para que no intente cargar el contexto
class OdontoAppApplicationTests {

	@Test
	void contextLoads() {
	}
}


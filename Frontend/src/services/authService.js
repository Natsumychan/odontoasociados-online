export const loginRequest = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8080/api/usuarios");

    if (!response.ok) {
      throw new Error("Error al contactar el backend");
    }

    const users = await response.json();

    // Buscar el usuario por email
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }

    // ⚠️ Como no hay JWT ni BCrypt funcionando,
    // asumimos que backend guarda la contraseña en texto plano.
    // Más adelante se implementará seguridad real.
    if (password !== "123456") {
      return { success: false, message: "Contraseña incorrecta" };
    }

    return { success: true, user };

  } catch (error) {
    return { success: false, message: error.message };
  }
};
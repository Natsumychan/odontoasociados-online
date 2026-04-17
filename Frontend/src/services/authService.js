export const loginRequest = async (documento, password) => {
	try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documento, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: errorText };
    }

    const data = await response.json();
    console.log("data = ", data)
    return {
      success: true,
      token: data.token,
      role: data.role,
      nombre: data.nombre,
      idUsuario: data.idUsuario
    };

  } catch (error) {
    return { success: false, message: "Error de conexión" };
  }
};

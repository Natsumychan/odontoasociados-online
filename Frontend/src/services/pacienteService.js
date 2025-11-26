import api from "../api/axios";

export async function crearPacienteConUsuario(data) {
  const response = await api.post("/pacientes", data);
  return response.data;
}

export async function obtenerPaciente(id) {
  const response = await api.get(`/pacientes/${id}`);
  return response.data;
}

export async function listarPacientes() {
  const response = await api.get("/pacientes");
  return response.data;
}

// futuro:
// actualizarPaciente
// eliminarPaciente
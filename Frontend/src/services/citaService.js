import api from "../api/axios";

export async function crearCita(data) {
  const response = await api.post("/citas", data);
  return response.data;
}

export async function obtenerCita(id) {
  const response = await api.get(`/citas/${id}`);
  return response.data;
}

export async function listarCitas() {
  const response = await api.get("/citas");
  return response.data;
}

export async function listarCitasPorPaciente(idPaciente) {
  const response = await api.get(`/citas/paciente/${idPaciente}`);
  return response.data;
}

export async function listarCitasPorOdontologo(idOdontologo) {
  const response = await api.get(`/citas/odontologo/${idOdontologo}`);
  return response.data;
}

export async function reprogramarCita(id, data) {
  const response = await api.put(`/citas/${id}`, data);
  return response.data;
}

export async function cancelarCita(id) {
  const response = await api.post(`/citas/${id}/cancel`);
  return response.data;
}
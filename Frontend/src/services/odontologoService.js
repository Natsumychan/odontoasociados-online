import api from "../api/axios";

export async function crearOdontologoVinculado(data) {
  const response = await api.post("/medicos/link", data);
  return response.data;
}

export async function crearOdontologoConUsuario(data) {
  const response = await api.post("/medicos", data);
  return response.data;
}

export async function obtenerOdontologo(id) {
  const response = await api.get(`/medicos/${id}`);
  return response.data;
}

export async function listarOdontologos() {
  const response = await api.get("/medicos");
  return response.data;
}

export async function actualizarOdontologo(id, data) {
  const response = await api.put(`/medicos/${id}`, data);
  return response.data;
}

export async function eliminarOdontologo(id) {
  const response = await api.delete(`/medicos/${id}`);
  return response.data;
}
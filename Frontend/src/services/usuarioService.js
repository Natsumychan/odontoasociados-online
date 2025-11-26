import api from "../api/axios";

export async function crearUsuario(data) {
  const response = await api.post("/usuarios", data);
  return response.data;
}

export async function obtenerUsuario(id) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

export async function listarUsuarios() {
  const response = await api.get("/usuarios");
  return response.data;
}

export async function actualizarUsuario(id, data) {
  const response = await api.put(`/usuarios/${id}`, data);
  return response.data;
}

export async function eliminarUsuario(id) {
  const response = await api.delete(`/usuarios/${id}`);
  return response.data;
}
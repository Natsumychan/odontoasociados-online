import api from "./axios";

export const cargarUsuario = async (id) => {
  const res = await api.get(`/admin/usuarios-completo/${id}`);
  return res.data;
};

export const crearRecepcionista = async (data) => {
  const res = await api.post("/admin/recepcionistas", data);
  return res.data;
};

export async function actualizarUsuarioCompleto(id, data) {
  return await api.put(`/admin/usuarios-completo/${id}`, data);
}
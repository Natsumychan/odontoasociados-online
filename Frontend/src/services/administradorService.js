import api from "./axios";

export const crearRecepcionista = async (data) => {
  const res = await api.post("/admin/recepcionistas", data);
  return res.data;
};
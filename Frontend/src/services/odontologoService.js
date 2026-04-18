import api from "./axios";

export async function crearOdontologoVinculado(data) {
	const response = await api.post("/odontologos/link", data);
	return response.data;
}

export async function crearOdontologoConUsuario(data) {
	const response = await api.post("/odontologos", data);
	return response.data;
}

export async function obtenerOdontologo(id) {
	const response = await api.get(`/odontologos/${id}`);
	return response.data;
}

export async function listarOdontologos() {
	const response = await api.get("/odontologos");
	return response.data;
}

export async function actualizarOdontologo(id, data) {
	const response = await api.put(`/odontologos/${id}`, data);
	return response.data;
}

export async function eliminarOdontologo(id) {
	const response = await api.delete(`/odontologos/${id}`);
	return response.data;
}

import { useState } from "react";
import Register from "../Register";
import CrearOdontologo from "./CrearOdontologo";
import CrearRecepcionista from "./CrearRecepcionista";
import ListarUsuarios from "./ListarUsuarios";

export default function AdminDashboard() {
	const [vista, setVista] = useState("usuarios");

	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<aside className='w-64 bg-[#00439C] text-white flex flex-col p-4'>
				<h2 className='text-xl font-bold mb-6'>Admin</h2>
				<div className='flex flex-col gap-2'>
					<button
						className='hover:bg-white/10 p-2 rounded text-left'
						onClick={() => setVista("usuarios")}>
						Usuarios
					</button>
					<button
						className='hover:bg-white/10 p-2 rounded text-left'
						onClick={() => setVista("paciente")}>
						Crear Paciente
					</button>
					<button
						className='hover:bg-white/10 p-2 rounded text-left'
						onClick={() => setVista("odontologo")}>
						Crear Odontólogo
					</button>
					<button
						className='hover:bg-white/10 p-2 rounded text-left'
						onClick={() => setVista("recepcionista")}>
						Crear Recepcionista
					</button>
				</div>
			</aside>

			{/* Contenido */}
			<div className="flex-1 p-6 overflow-auto">
				{vista === "usuarios" && <ListarUsuarios />}
				{vista === "paciente" && <Register />}
				{vista === "odontologo" && <CrearOdontologo />}
				{vista === "recepcionista" && <CrearRecepcionista />}
			</div>
		</div>
	);
}

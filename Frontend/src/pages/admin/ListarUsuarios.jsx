import { useEffect, useState } from "react";
import { listarUsuarios } from "../../services/usuarioService";
import EditarUsuario from "./EditarUsuario";

export default function ListaUsuarios() {
	const [usuarios, setUsuarios] = useState([]);
	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

	useEffect(() => {
		cargarUsuarios();
	}, []);

	const cargarUsuarios = async () => {
		const data = await listarUsuarios();
		console.log(data);
		setUsuarios(data);
	};

	return (
		<div>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>Usuarios</h2>
			<div className='bg-white shadow-md rounded-xl overflow-hidden'>
				<table className='w-full text-sm text-left'>
					<thead className='bg-gray-100 text-gray-600 uppercase text-md'>
						<tr>
							<th className='px-6 py-3'>Nombre</th>
							<th className='px-6 py-3'>Cédula</th>
							<th className='px-6 py-3'>Email</th>
							<th className='px-6 py-3'>Teléfono</th>
							<th className='px-6 py-3'>Rol</th>
							<th className='px-6 py-3'></th>
						</tr>
					</thead>
					<tbody>
						{usuarios.map((u, index) => (
							<tr
								className={`border-t hover:bg-gray-50 transition ${
									index % 2 === 0 ? "bg-white" : "bg-gray-50"
								}`}
								key={u.id}>
								<td className='px-6 py-3 font-medium text-gray-800 text-lg	'>
									{u.nombre} {u.apellido}
								</td>
								<td className='px-6 py-3 font-medium text-gray-800 text-lg	'>
									{u.documento}
								</td>
								<td className='px-6 py-3 font-medium text-gray-800 text-lg	'>
									{u.email}
								</td>
								<td className='px-6 py-3 font-medium text-gray-800 text-lg	'>
									{u.telefono}
								</td>
								<td className='px-6 py-3 font-medium text-gray-800 text-lg	'>
									<span
										className={`px-4 py-2 rounded-full text-md font-semibold ${
											u.rol === "administrador"
												? "bg-purple-100 text-purple-700"
												: u.rol === "odontologo"
													? "bg-blue-100 text-blue-700"
													: u.rol === "recepcionista"
														? "bg-yellow-100 text-yellow-700"
														: "bg-green-100 text-green-700"
										}`}>
										{u.rol}
									</span>
								</td>
								<td className='px-6 py-3 text-center'>
									<button
										className='text-blue-600 hover:underline'
										onClick={() => setUsuarioSeleccionado(u)}>
										Editar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{usuarioSeleccionado && (
				<EditarUsuario
					usuarioSeleccionado={usuarioSeleccionado}
					onClose={() => setUsuarioSeleccionado(null)}
					onActualizado={cargarUsuarios}
				/>
			)}
		</div>
	);
}

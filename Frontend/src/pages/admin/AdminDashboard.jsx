import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CrearOdontologo from "./CrearOdontologo";
import CrearRecepcionista from "./CrearRecepcionista";
import ListarUsuarios from "./ListarUsuarios";
import {
	Calendar,
	CreditCard,
	FileText,
	Home,
	User,
	LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
	const [vista, setVista] = useState("usuarios");

	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (confirm("¿Desea cerrar la sesión actual?")) {
			logout();
			navigate("/", { replace: true });
		}
	};

	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<aside className='fixed w-64 h-full bg-[#00439C] text-white flex flex-col p-4'>
				<h2 className='text-xl font-bold mb-6'>Admin</h2>
				<div className='flex flex-col gap-2'>
					<button
						className='hover:bg-white/10 p-2 rounded text-left'
						onClick={() => setVista("usuarios")}>
						Usuarios
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
					<div className='absolute bottom-18 left-4'>
						<button
							onClick={handleLogout}
							className=' flex gap-1 hover:bg-white-100 hover:text-red-600 p-2 rounded font-medium'>
							<LogOut size={20} />
							Cerrar sesión
						</button>
					</div>
				</div>
			</aside>

			{/* Contenido */}
			<div className='flex-1 pl-70 p-6 overflow-auto'>
				{vista === "usuarios" && <ListarUsuarios />}
				{vista === "odontologo" && <CrearOdontologo />}
				{vista === "recepcionista" && <CrearRecepcionista />}
			</div>
		</div>
	);
}

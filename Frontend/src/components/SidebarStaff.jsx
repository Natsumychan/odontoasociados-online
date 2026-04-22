import { Link, useNavigate } from "react-router-dom";
import {
	Calendar,
	CreditCard,
	FileText,
	Home,
	User,
	LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SidebarStaff = ({ open, onClose }) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		if (confirm("¿Desea cerrar la sesión actual?")) {
			logout();
			navigate("/", { replace: true });
		}
	};

	return (
		<>
			{/* 🔹 Fondo oscuro cuando el menú está abierto en móviles */}
			{open && (
				<div
					onClick={onClose}
					className='fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden'></div>
			)}

			<div
				className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
				<div className='flex items-center justify-between px-4 py-4 border-b lg:border-none'>
					<h2 className='text-blue-900 font-bold text-lg'>Menú</h2>
					<button
						onClick={onClose}
						className='text-gray-600 hover:text-blue-700 text-lg md:hidden'>
						✕
					</button>
				</div>

				<nav className='flex flex-col mt-4 space-y-2 px-4'>
					<Link
						to='/dashboardEquipoDeTrabajo'
						className='flex gap-1 text-gray-700 hover:bg-blue-100 p-2 rounded'>
						<Home size={20} />
						Inicio
					</Link>
					<button className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2'>
						<Link to='/nueva-cita'>
							<span className='text-lg'>+</span>
							<span>Nueva cita</span>
						</Link>
					</button>
				</nav>

				<div className='absolute bottom-4 left-4'>
					<button
						onClick={handleLogout}
						className=' flex gap-1 text-red-600 hover:bg-red-100 p-2 rounded font-medium'>
						<LogOut size={20} />
						Cerrar sesión
					</button>
				</div>
			</div>
		</>
	);
};

export default SidebarStaff;

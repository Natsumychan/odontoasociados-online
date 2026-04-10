import { useAuth } from "../context/AuthContext";

const Topbar = ({ onMenuClick }) => {
	const { user } = useAuth();

	return (
		<header className='fixed top-0 left-0 w-full bg-[#00439C] text-white flex justify-between items-center px-4 py-3 shadow-md z-50'>
			{/* 🔹 Botón hamburguesa (solo móvil) */}
			<button
				onClick={onMenuClick}
				className='text-white text-2xl mr-2 md:hidden'>
				☰
			</button>

			<h1 className='text-lg font-semibold flex-1'>Odontólogos Asociados</h1>

			<div className='hidden md:flex items-center gap-4'>
				{user && (
					<span className='text-md'>
						{user.role === "paciente" ? "👤 Paciente:" : "🩺 Médico:"}{" "}
						<strong>{user.email}</strong>
					</span>
				)}
			</div>
		</header>
	);
};

export default Topbar;

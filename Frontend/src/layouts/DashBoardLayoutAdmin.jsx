import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar, Sidebar } from "../components";

const DashboardLayoutAdmin = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='flex flex-col min-h-screen bg-gray-50 text-gray-800'>
			{/* 🔹 Topbar fijo arriba */}
			<header className='fixed top-0 left-0 w-full bg-[#00439C] text-white flex justify-between items-center px-4 py-3 shadow-md z-50'>
				<h1 className='text-lg font-semibold flex-1'>Odontólogos Asociados</h1>
			</header>
			{/* 🔹 Contenido principal */}
			<main className={`flex-1 mt-12 p-0 transition-all duration-300`}>
				<Outlet />
			</main>
		</div>
	);
};

export default DashboardLayoutAdmin;

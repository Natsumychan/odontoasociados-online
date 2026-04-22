import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TodayAppointments = () => {
	const [citas, setCitas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [orden, setOrden] = useState("hora"); // hora | paciente

	useEffect(() => {
		cargarCitasHoy();
	}, []);

	const cargarCitasHoy = async () => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:8080/api/citas/agenda/hoy");
			console.log("datos agenda del día", res);
			if (!res.ok) throw new Error();

			const data = await res.json();

			setCitas(data);
		} catch (error) {
			toast.error("Error cargando agenda del día");
		} finally {
			setLoading(false);
		}
	};

	// 🔥 ORDENAMIENTO
	const citasOrdenadas = [...citas].sort((a, b) => {
		if (orden === "hora") {
			return a.hora.localeCompare(b.hora);
		}
		if (orden === "paciente") {
			return a.pacienteNombre.localeCompare(b.pacienteNombre);
		}
		return 0;
	});

	return (
		<div className='bg-white rounded-xl shadow-md p-6'>
			{/* 🔹 Header */}
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-bold text-[#00439C]'>Agenda de hoy</h2>

				{/* 🔹 Selector de orden */}
				<select
					value={orden}
					onChange={(e) => setOrden(e.target.value)}
					className='border p-2 rounded-md'>
					<option value='hora'>Ordenar por hora</option>
					<option value='paciente'>Ordenar por paciente</option>
				</select>
			</div>

			{/* 🔹 LOADING */}
			{loading && (
				<div className='text-center py-6'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#00439C] mx-auto'></div>
					<p className='mt-2 text-gray-500'>Cargando agenda...</p>
				</div>
			)}

			{/* 🔹 SIN CITAS */}
			{!loading && citas.length === 0 && (
				<div className='text-center py-6 text-gray-500 font-medium'>
					📅 No hay citas asignadas hoy
				</div>
			)}

			{/* 🔹 LISTA */}
			{!loading && citas.length > 0 && (
				<div className='space-y-4'>
					{citasOrdenadas.map((cita) => (
						<div
							key={cita.id}
							className='flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition'>
							<div>
								<p className='font-semibold text-gray-900'>
									{cita.pacienteNombre}
								</p>
								<p className='text-sm text-gray-600'>
									{cita.tratamientosNombres}
								</p>
							</div>

							<div className='text-right'>
								<p className='font-bold text-[#00439C]'>
									{cita.hora?.substring(0, 5)}
								</p>
								<p className='text-sm text-gray-500'>{cita.odontologoNombre}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TodayAppointments;

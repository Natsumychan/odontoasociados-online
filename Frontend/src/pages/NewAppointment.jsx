import { useState } from "react";
import {
	crearCita,
	cargarOdontologos,
	obtenerHorarios,
	obtenerHorariosDisponibles,
} from "../services/citaService";
import { AppointmentDay } from "../components";

const NewAppointment = () => {
	const [odontologos, setOdontologos] = useState([]);
	const [horarios, setHorarios] = useState([]);
	const [formData, setFormData] = useState({
		idPaciente: 1,
		idOdontologo: null,
		tratamientosIds: "",
		fecha: "",
		hora: "",
		motivo: "",
	});
	const FESTIVOS = [
		"2026-01-01", // Año nuevo
		"2026-01-12", // Reyes Magos (trasladado)
		"2026-03-23", // San José
		"2026-04-02", // Jueves Santo
		"2026-04-03", // Viernes Santo
		"2026-05-01", // Día del trabajo
		"2026-05-18", // Ascensión
		"2026-06-08", // Corpus Christi
		"2026-06-15", // Sagrado Corazón
		"2026-07-20", // Independencia
		"2026-08-07", // Batalla de Boyacá
		"2026-08-17", // Asunción
		"2026-10-12", // Día de la raza
		"2026-11-02", // Día de Todos los santos
		"2026-11-16", // Independencia Cartagena
		"2026-12-08", // Inmaculada Concepción
		"2026-12-25", // Navidad
		"2027-01-01", // Año nuevo
		"2027-01-02", // Descanso extra
	];

	const handleChange = async (e) => {
		const { name, value } = e.target;

		if (name === "tratamientosIds") {
			const selected = Number(value);

			setFormData((prev) => ({
				...prev,
				tratamientosIds: [selected],
			}));

			try {
				const res = await cargarOdontologos(selected);
				setOdontologos(res);
			} catch (err) {
				console.error("Error cargando odontólogos", err);
			}

			return;
		}

		if (name === "fecha") {
			const fechaSeleccionada = new Date(value);
			const dia = fechaSeleccionada.getDay();

			 // 🚫 Domingo
			if (dia === 6) {
				alert("No prestamos servicio los domingos");
				return;
			}
		}

		  // 🚫 Festivos
  if (FESTIVOS.includes(value)) {
    alert("Lo sentimos, no prestamos servicio en días festivos");
    return;
  }

		if (name === "fecha" || name === "idOdontologo") {
			const newForm = {
				...formData,
				[name]: value,
			};

			setFormData(newForm);

			if (newForm.fecha && newForm.idOdontologo) {
				try {
					const horas = await obtenerHorariosDisponibles(
						newForm.idOdontologo,
						newForm.fecha,
						newForm.tratamientosIds,
					);
					setHorarios(horas);
				} catch (err) {
					console.error("Error cargando horarios", err);

					const mensaje =
						err.response?.data ||
						"No hay disponibilidad para la fecha seleccionada";

					alert(mensaje);

					setHorarios([]); // limpiar horarios
				}
			}

			return;
		}

		// ✅ IMPORTANTE: manejar los demás campos
		setFormData((prev) => ({
			...prev,
			[name]: name === "idOdontologo" ? Number(value) : value,
		}));
	};

	// --- Crear cita ---
	const handleConfirmar = async () => {
		try {
			console.log("📤 Enviando:", formData);
			console.log("crearCita:", crearCita);
			const data = await crearCita(formData); // 🔥 USA AXIOS

			console.log("✅ Cita creada:", data);
			alert("Cita creada correctamente");

			// Reset
			setFormData({
				idPaciente: 1,
				idOdontologo: null,
				tratamientosIds: [],
				fecha: "",
				hora: "",
				motivo: "",
			});
		} catch (error) {
			console.error("❌ Error backend:", error.response?.data || error.message);

			alert(error.response?.data || "Error creando la cita");
		}
	};

	return (
		<div className='flex-1 p-8'>
			<div className='max-w-2xl mx-auto'>
				<div className='bg-white rounded-lg shadow-sm p-8'>
					<h1 className='text-3xl font-bold text-blue-600 text-center mb-8'>
						Agendar cita
					</h1>

					<div className='space-y-6'>
						{/* Tratamiento */}
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Servicio / Tratamiento
							</label>
							<select
								name='tratamientosIds'
								value={formData.tratamientosIds[0] || ""}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
								<option value=''>Seleccione...</option>
								<option value='1'>Examen oral</option>
								<option value='2'>Limpieza dental</option>
								<option value='3'>Extracción</option>
								<option value='4'>Ortodoncia</option>
								<option value='5'>Endodoncia</option>
								<option value='6'>Blanqueamiento</option>
							</select>
						</div>

						{/* Odontólogo */}
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Odontólogo
							</label>
							<select
								disabled={!formData.tratamientosIds.length}
								name='idOdontologo'
								value={formData.idOdontologo ?? ""}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
								<option value=''>Seleccione...</option>
								{odontologos.map((o) => (
									<option
										key={o.idUsuario}
										value={o.idUsuario}>
										{o.usuario?.nombre} {o.usuario?.apellido}
									</option>
								))}
							</select>
						</div>

						{/* Fecha */}
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Fecha
							</label>
							<input
								type='date'
								name='fecha'
								value={formData.fecha}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
							/>
						</div>
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Horario Disponible
							</label>
							<AppointmentDay
								odontologoId={formData.idOdontologo}
								fecha={formData.fecha}
								onSeleccionarHora={(hora) =>
									setFormData((prev) => ({ ...prev, hora }))
								}
							/>
						</div>

						{/* Hora */}
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Seleccione la hora para su cita
							</label>
							<select
								name='hora'
								value={formData.hora}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
								<option value=''>Seleccione hora</option>
								{horarios.map((h, i) => (
									<option
										key={i}
										value={h}>
										{h}
									</option>
								))}
							</select>
						</div>

						{/* Motivo */}
						<div>
							<label className='block text-gray-900 font-bold mb-2'>
								Motivo
							</label>
							<textarea
								name='motivo'
								value={formData.motivo}
								onChange={handleChange}
								placeholder='Detalles adicionales'
								rows='4'
								className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none'
							/>
						</div>

						{/* Botón Confirmar */}
						<div className='space-y-3'>
							<button
								onClick={handleConfirmar}
								className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition'>
								Confirmar cita
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewAppointment;

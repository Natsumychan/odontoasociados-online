import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { obtenerHorariosDisponibles } from "../services/citaService";
import { toast } from "react-toastify";

const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [isReprogramModalOpen, setReprogramModalOpen] = useState(false);
	const [isCancelModalOpen, setCancelModalOpen] = useState(false);
	const [newDate, setNewDate] = useState("");
	const [newTime, setNewTime] = useState("");
	const [horariosDisponibles, setHorariosDisponibles] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user } = useAuth();
	const pacienteId = user.idUsuario; // 🔹 Id el paciente

	// 🔹 Cargar citas reales desde backend
	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				setLoading(true);
				toast.info("Cargando citas...");
				const res = await fetch(
					`http://localhost:8080/api/citas/paciente/${pacienteId}`,
				);
				console.log(res);
				if (!res.ok) throw new Error("Error consultando citas");

				const data = await res.json();
				console.log("Respuesta bruta del backend:", data);
				console.log("Respuesta primer dato del backend:", data[3]);
				// Adaptación: backend devuelve fecha/hora separadas
				const mapped = data.map((cita) => ({
					id: cita.id,
					idDoctor: cita.odontologoId,
					doctor: cita.odontologoNombre || `Odontólogo #${cita.odontologoId}`,
					idPaciente: cita.pacienteId,
					date: cita.fecha,
					time: cita.hora,
					tratamientosIds: cita.tratamientosIds,
					service:
						cita.tratamientosNombres || `Tratamiento #${cita.tratamientoId}`,
				}));
				setAppointments(mapped);
				toast.dismiss(); // 🔥 limpia el "cargando"

			if (mapped.length === 0) {
				toast.info("No tienes citas registradas");
			} else {
				toast.success("Citas cargadas correctamente");
			}
			} catch (err) {
				console.error(err);
				alert("Error cargando citas");
			} finally {
			setLoading(false);
		}
		};

		fetchAppointments();
	}, []);

	useEffect(() => {
		if (!newDate || !selectedAppointment) return;

		const fetchHorarios = async () => {
			try {
				const horarios = await obtenerHorariosDisponibles(
					selectedAppointment.idDoctor,
					newDate,
					[selectedAppointment.tratamientosIds],
				);
				setHorariosDisponibles(horarios);
				setNewTime(""); // resetear hora
			} catch (error) {
				console.error(error);
			}
		};

		fetchHorarios();
	}, [newDate, selectedAppointment]);

	// 🔹 Abrir modal de reprogramación
	const openReprogramModal = async (appt) => {
		console.log("OBJETO COMPLETO DE LA CITA SELECCIONADA:", appt);
		setSelectedAppointment(appt);
		setNewDate(appt.date);
		setNewTime("");
		setReprogramModalOpen(true);
		try {
			const horarios = await obtenerHorariosDisponibles(
				appt.idDoctor,
				appt.date,
				[appt.tratamientosIds],
			);

			setHorariosDisponibles(horarios);
		} catch (error) {
			console.error("Error cargando horarios:", error);
		}
	};

	// 🔹 Confirmar reprogramación (PUT al backend)
	const handleReprogram = async () => {
		console.log("datos", selectedAppointment);
		console.log("id cita", selectedAppointment.id);
		console.log("id tratamiento", selectedAppointment.tratamientosIds);
		if (!newDate || !newTime) {
			alert("Debe seleccionar fecha y hora válida");
			return;
		}
		try {
			const res = await fetch(
				`http://localhost:8080/api/citas/${selectedAppointment.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						fecha: newDate,
						hora: newTime,
					}),
				},
			);

			if (!res.ok) throw new Error("Error reprogramando cita");

			const updated = await res.json();

			setAppointments((prev) =>
				prev.map((appt) =>
					appt.id === selectedAppointment.id
						? { ...appt, date: updated.fecha, time: updated.hora }
						: appt,
				),
			);

			setReprogramModalOpen(false);
			alert("Cita reprogramada con éxito");
		} catch (err) {
			console.error(err);
			alert("No se pudo reprogramar la cita");
		}
	};

	// 🔹 Abrir modal de cancelación
	const openCancelModal = (appt) => {
		setSelectedAppointment(appt);
		setCancelModalOpen(true);
	};

	// 🔹 Confirmar cancelación: POST /cancel
	const handleCancel = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/api/citas/${selectedAppointment.id}/cancel`,
				{ method: "POST" },
			);

			if (!res.ok) throw new Error("Error cancelando cita");

			setAppointments((prev) =>
				prev.filter((appt) => appt.id !== selectedAppointment.id),
			);

			setCancelModalOpen(false);
			alert("Cita cancelada");
		} catch (err) {
			console.error(err);
			alert("No se pudo cancelar la cita");
		}
	};

	return (
		<div className='p-6 md:p-10 bg-gray-50 min-h-screen'>
			<h2 className='text-2xl font-bold text-[#00439C] text-center mb-8'>
				Mis citas
			</h2>

			<div className='space-y-6'>
				{appointments.length === 0 && (
					<p className='text-center text-gray-600'>
						No tienes citas registradas.
					</p>
				)}

				{appointments.map((appt) => (
					<div
						key={appt.id}
						className='bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg'>
						<div className='mb-4 md:mb-0'>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Cita con {appt.doctor}
							</h3>
							<p className='text-gray-700'>
								<strong>Fecha:</strong> {appt.date}
							</p>
							<p className='text-gray-700'>
								<strong>Hora:</strong> {appt.time}
							</p>
							<p
								className='text-gray-700'
								key={appt.tratamientosIds}>
								<strong>Servicio:</strong> {appt.service}
							</p>
						</div>

						<div className='flex flex-col items-end gap-2 w-full md:w-auto'>
							<button
								onClick={() => openReprogramModal(appt)}
								className='w-30 border border-[#00439C] text-[#00439C] font-medium px-4 py-2 rounded-md hover:bg-[#00439C] hover:text-white transition'>
								Reprogramar
							</button>

							<button
								onClick={() => openCancelModal(appt)}
								className='w-30 bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition'>
								Cancelar
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Modal de reprogramar */}
			{isReprogramModalOpen && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
					<div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md'>
						<h3 className='text-lg font-semibold text-[#00439C] mb-4'>
							Reprogramar cita con {selectedAppointment?.doctor}
						</h3>

						<input
							type='date'
							value={newDate}
							onChange={(e) => setNewDate(e.target.value)}
							className='w-full border p-2 mb-4 rounded-md'
							min={new Date().toISOString().split("T")[0]}
						/>

						<select
							value={newTime}
							onChange={(e) => setNewTime(e.target.value)}
							className='w-full border p-2 mb-6 rounded-md'>
							<option value=''>Seleccione un horario</option>
							{horariosDisponibles.map((hora, index) => (
								<option
									key={index}
									value={hora}>
									{hora}
								</option>
							))}
						</select>

						<div className='flex justify-end gap-3'>
							<button
								onClick={() => setReprogramModalOpen(false)}
								className='px-4 py-2 bg-gray-200 rounded-md'>
								Cancelar
							</button>

							<button
								onClick={handleReprogram}
								className='px-4 py-2 bg-[#00439C] text-white rounded-md'>
								Guardar cambios
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Modal de cancelar */}
			{isCancelModalOpen && (
				<div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
					<div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center'>
						<h3 className='text-lg font-semibold text-[#00439C] mb-4'>
							¿Deseas cancelar esta cita?
						</h3>

						<p className='text-gray-600 mb-6'>
							Cita con {selectedAppointment?.doctor} el{" "}
							<strong>{selectedAppointment?.date}</strong> a las{" "}
							<strong>{selectedAppointment?.time}</strong>
						</p>

						<div className='flex justify-center gap-3'>
							<button
								onClick={() => setCancelModalOpen(false)}
								className='px-4 py-2 bg-gray-200 rounded-md'>
								No
							</button>

							<button
								onClick={handleCancel}
								className='px-4 py-2 bg-red-600 text-white rounded-md'>
								Sí, cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Appointments;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
	cargarUsuario,
	actualizarUsuarioCompleto,
} from "../services/administradorService";
import { toast } from "react-toastify";

const Profile = () => {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		email: "",
		telefono: "",
		documento: "",
		password: "",
		rol: "",

		// datos específicos
		grupoSanguineo: "",
		eps: "",
		alergias: "",
		medicamentoAlergias: "",
	});
	const { user } = useAuth();
	const pacienteId = user.idUsuario;

	useEffect(() => {
		if (!pacienteId) return;
		const cargarDatos = async () => {
			try {
				const data = await cargarUsuario(pacienteId);
				console.log("datos usuario", data);
				setForm({
					nombre: data.nombre || "",
					apellido: data.apellido || "",
					email: data.email || "",
					telefono: data.telefono || "",
					documento: data.documento || "",
					password: "",
					rol: data.rol || "",

					// 🟦 odontólogo
					especialidad: data.odontologo?.especialidad || "",
					numeroLicencia: data.odontologo?.numeroLicencia || "",
					trayectoriaProfesional: data.odontologo?.trayectoriaProfesional || "",

					// 🟨 recepcionista
					turno: data.recepcionista?.turno || "",
					oficina: data.recepcionista?.oficina || "",

					// 🟩 paciente
					grupoSanguineo: data.paciente?.grupoSanguineo || "",
					eps: data.paciente?.eps || "",
					alergias: data.paciente?.alergias || "",
					medicamentoAlergias: data.paciente?.medicamentoAlergias || "",
				});
			} catch (error) {
				console.error("Error cargando usuario completo", error);
			}
		};

		cargarDatos();
	}, [pacienteId]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		  e.preventDefault();

        try {
          await actualizarUsuarioCompleto(pacienteId, form);

          
          toast.success("Cambios guardados")
        } catch (error) {
          console.error(error);
          toast.error("Error al actualizar");
        }
	};

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-xl mx-auto'>
				<div className='bg-white rounded-lg shadow-sm p-8'>
					<h1 className='text-3xl font-bold text-blue-600 text-center mb-8'>
						Perfil de usuario
					</h1>

					<form
						onSubmit={handleSubmit}
						className='space-y-4'>
						{/* Nombres */}
						<div>
							<label className='block font-medium'>Nombres </label>
							<input
								type='text'
								name='nombre'
								value={form.nombre}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* Apellidos */}
						<div>
							<label className='block font-medium'>Apellidos *</label>
							<input
								type='text'
								name='apellido'
								value={form.apellido}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* Cédula */}
						<div>
							<label className='block font-medium'>Cédula *</label>
							<input
								type='text'
								name='documento'
								value={form.documento}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* Fecha */}
						{/* <div>
							<label className='block font-medium'>Fecha de nacimiento *</label>
							<input
								type='date'
								name='fechaNacimiento'
								value={form.fechaNacimiento}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div> */}

						{/* Celular */}
						<div>
							<label className='block font-medium'>Celular *</label>
							<input
								type='tel'
								name='telefono'
								value={form.telefono}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* Correo */}
						<div>
							<label className='block font-medium'>Correo </label>
							<input
								type='email'
								name='email'
								value={form.email}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* Contraseña */}
						<div>
							<label className='block font-medium'>Contraseña *</label>
							<input
								type='password'
								name='password'
								value={form.password}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>

						{/* grupo sanguineo */}
						<div>
							<label className='block font-medium'>Grupo sanguineo</label>
							<select
								name='grupoSanguineo'
								placeholder='Selecciona tu tipo de sangre'
								value={form.grupoSanguineo}
								onChange={handleChange}
								className='w-full border p-2 rounded'>
								<option value=''>Seleccione...</option>
								<option value='A+'> A+ </option>
								<option value='A-'>A-</option>
								<option value='B+'>B+</option>
								<option value='B-'>B-</option>
								<option value='AB+'>AB+</option>
								<option value='AB-'>AB-</option>
								<option value='O+'>O+</option>
								<option value='O-'>O-</option>
							</select>
						</div>

						{/* Alergia */}
						<div className='flex gap-2'>
							<input
								type='checkbox'
								name='alergias'
								checked={form.alergias}
								onChange={handleChange}
							/>
							<label>¿Alergias a medicamentos?</label>
						</div>

						{/* Medicamento */}
						{form.alergias && (
							<input
								type='text'
								name='medicamentoAlergias'
								placeholder='Medicamento'
								value={form.medicamentoAlergias}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						)}

						{/* EPS */}
						<div>
							<label className='block font-medium'>EPS *</label>
							<select
								type='text'
								name='eps'
								value={form.eps}
								onChange={handleChange}
								className='w-full border p-2 rounded'>
								<option value=''>Seleccione...</option>
								<option value='Sura'>Sura</option>
								<option value='Sanitas'>Sanitas</option>
								<option value='Salud Total'>Salud Total</option>
								<option value='Nueva EPS'>Nueva EPS</option>
								<option value='Compensar'>Compensar</option>
								<option value='Coosalud'>Coosalud</option>
								<option value='Mutual Ser'>Mutual Ser</option>
								<option value='Famisanar'>Famisanar</option>
								<option value='EPS S0S'>EPS S0S</option>
								<option value='Capital Salud'>Capital Salud</option>
								<option value='Cajacopi'>Cajacopi</option>
							</select>
						</div>

						<button className='w-full bg-blue-600 text-white py-2 rounded'>
							Guardar cambios
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;

import { useState, useEffect } from "react";
import { actualizarUsuario } from "../../services/usuarioService";
import { actualizarOdontologo } from "../../services/odontologoService";
import { cargarUsuario, actualizarUsuarioCompleto } from "../../services/administradorService";
// luego agregas los otros services

export default function EditarUsuario({
	usuarioSeleccionado,
	onClose,
	onActualizado,
}) {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		email: "",
		telefono: "",
		documento: "",
		password: "",
		rol: "",

		// datos específicos
		especialidad: "",
		numeroLicencia: "",
		trayectoriaProfesional: "",

		turno: "",
		oficina: "",

		grupoSanguineo: "",
		eps: "",
		alergias: "",
    medicamentoAlergias:""
	});

	useEffect(() => {
		if (!usuarioSeleccionado) return;
		const cargarDatos = async () => {
			try {
				const data = await cargarUsuario(usuarioSeleccionado.id);
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
          medicamentoAlergias:data.paciente?.medicamentoAlergias || ""
				});
			} catch (error) {
				console.error("Error cargando usuario completo", error);
			}
		};

		cargarDatos();
	}, [usuarioSeleccionado]);

	// cerrar con ESC
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await actualizarUsuarioCompleto(usuarioSeleccionado.id, form);

			onActualizado();
			onClose();
		} catch (error) {
			console.error(error);
			alert("Error al actualizar");
		}
	};

	return (
		<div className='fixed inset-0 z-9999 flex items-center justify-center'>
			{/* 🔴 Overlay */}
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={onClose}></div>

			{/* 🟢 Modal */}
			<div
				className='relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 z-10'
				onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-semibold text-gray-800'>
						Editar Usuario
					</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-600 text-xl'>
						✕
					</button>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div className='grid grid-cols-2 gap-3'>
						<label className='block font-medium'>Nombre</label>
						<input
							name='nombre'
							value={form.nombre}
							onChange={handleChange}
							placeholder='Nombre'
							className='input'
						/>
						<label className='block font-medium'>Apellidos</label>
						<input
							name='apellido'
							value={form.apellido}
							onChange={handleChange}
							placeholder='Apellido'
							className='input'
						/>
					</div>
					<div className='grid grid-cols-2 gap-3'>
						<label className='block font-medium'>Correo</label>
						<input
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder='Correo'
							className='input'
						/>
					</div>
					<div className='grid grid-cols-2 gap-3'>
						<label className='block font-medium'>Teléfono</label>
						<input
							name='telefono'
							value={form.telefono}
							onChange={handleChange}
							placeholder='Teléfono'
							className='input'
						/>
						<label className='block font-medium'>Cédula</label>
						<input
							name='documento'
							value={form.documento}
							onChange={handleChange}
							placeholder='Documento'
							className='input'
						/>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<label className='block font-medium'>Tipo de rol</label>
						<select
							name='rol'
							value={form.rol}
							onChange={handleChange}
							className='input'>
							<option value='paciente'>Paciente</option>
							<option value='odontologo'>Odontólogo</option>
							<option value='recepcionista'>Recepcionista</option>
							<option value='administrador'>Administrador</option>
						</select>
					</div>
					{/* 🔵 CAMPOS DINÁMICOS */}

					{form.rol === "odontologo" && (
						<>
							<h3 className='text-lg font-semibold text-gray-800'>
								Datos odontólogo
							</h3>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>Especialidad</label>
								<input
									name='especialidad'
									value={form.especialidad}
									onChange={handleChange}
									placeholder='Especialidad'
									className='input'
								/>
							</div>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>
									Matrícula profesional
								</label>
								<input
									name='numeroLicencia'
									value={form.numeroLicencia}
									onChange={handleChange}
									placeholder='Licencia'
									className='input'
								/>
							</div>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>
									Experiencia profesional
								</label>
								<input
									name='trayectoriaProfesional'
									type='number'
									value={form.trayectoriaProfesional}
									onChange={handleChange}
									placeholder='Experiencia'
									className='input'
								/>
							</div>
						</>
					)}

					{form.rol === "recepcionista" && (
						<>
							<h3 className='text-lg font-semibold text-gray-800'>
								Datos recepcionista
							</h3>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>Oficina</label>
								<input
									name='oficina'
									value={form.oficina}
									onChange={handleChange}
									placeholder='Oficina'
									className='input'
								/>
							</div>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>Turno</label>
								<select
									name='turno'
									value={form.turno}
									onChange={handleChange}
									className='input'>
									<option value='manana'>Mañana</option>
									<option value='tarde'>Tarde</option>
								</select>
							</div>
						</>
					)}

					{form.rol === "paciente" && (
						<>
							<h3 className='text-lg font-semibold text-gray-800'>
								Datos paciente
							</h3>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>Grupo sanguíneo</label>
								<input
									name='grupoSanguineo'
									value={form.grupoSanguineo}
									onChange={handleChange}
									placeholder='Grupo sanguíneo'
									className='input'
								/>
							</div>
							<div className='grid grid-cols-2 gap-3'>
								<label className='block font-medium'>EPS</label>
								<input
									name='eps'
									value={form.eps}
									onChange={handleChange}
									placeholder='EPS'
									className='input'
								/>
							</div>
              <div className='grid grid-cols-2 gap-3'>
						    <label className='block font-medium'>Tiene alergias a medicamentos</label>
						    <input
							    name='alergias'
							    value={form.alergias}
							    onChange={handleChange}
							    placeholder='Alergias'
							    className='input'
						    />
					    </div>
              <div className='grid grid-cols-2 gap-3'>
						    <label className='block font-medium'>Medicamentos que causan alergia</label>
						    <input
							    name='medicamentoAlergias'
							    value={form.medicamentoAlergias}
							    onChange={handleChange}
							    placeholder='Nombre del medicamento'
							    className='input'
						    />
					    </div>
						</>
					)}

					{/* Password (solo una vez) */}
					<div className='grid grid-cols-2 gap-3'>
						<label className='block font-medium'>Cambiar contraseña</label>
						<input
							name='password'
							type='password'
							value={form.password}
							onChange={handleChange}
							placeholder='Nueva contraseña (opcional)'
							className='input'
						/>
					</div>

					{/* Botones */}
					<div className='flex justify-end gap-2 pt-3'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200'>
							Cancelar
						</button>

						<button
							type='submit'
							className='px-4 py-2 rounded-lg bg-[#00439C] text-white hover:bg-[#003080] shadow'>
							Guardar cambios
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

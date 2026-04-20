import { useState } from "react";
import { crearOdontologoConUsuario } from "../../services/odontologoService";

export default function CrearOdontologo() {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		documento: "",
		email: "",
		telefono: "",
		password: "",
		especialidad: "",
		numeroLicencia: "",
		trayectoriaProfesional: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			usuario: {
				nombre: form.nombre,
				apellido: form.apellido,
				documento: form.documento,
				email: form.email,
				telefono: form.telefono,
				password: form.password,
				rol: "odontologo",
			},
			odontologo: {
				especialidad: form.especialidad,
				numeroLicencia: form.numeroLicencia,
				trayectoriaProfesional: parseInt(form.trayectoriaProfesional),
			},
		};

		try {
			await crearOdontologoConUsuario(data);
			alert("Odontólogo creado correctamente");

			// limpiar formulario
			setForm({
				nombre: "",
				apellido: "",
				documento: "",
				email: "",
				telefono: "",
				password: "",
				especialidad: "",
				numeroLicencia: "",
				trayectoriaProfesional: "",
			});
		} catch (error) {
			console.error(error);
			alert("Error al crear odontólogo");
		}
	};

	return (
		<section className='flex justify-center items-center py-12'>
			<div className='bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl'>
				<form onSubmit={handleSubmit}>
					<h2 className='text-3xl font-bold text-[#00439C] text-center mb-6'>
						Crear Odontólogo
					</h2>

					<h3 className='text-xl font-semibold text-gray-800'>
						Datos generales
					</h3>
					<div className='grid grid-cols-2 gap-5'>
						<div>
							<label className='block font-medium'>Nombre</label>
							<input
								className='w-full border p-2 rounded'
								name='nombre'
								placeholder='Nombre'
								value={form.nombre}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label className='block font-medium'>Apellidos</label>
							<input
								className='w-full border p-2 rounded'
								name='apellido'
								placeholder='Apellido'
								value={form.apellido}
								onChange={handleChange}
							/>
						</div>
					</div>
					{/* Cédula */}
					<div className='py-3'>
						<label className='block font-medium'>Cédula *</label>
						<input
							type='text'
							name='documento'
							value={form.documento}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							required
						/>
					</div>
					<div className='grid grid-cols-2 gap-5'>
						<div>
							<label className='block font-medium'>Correo</label>
							<input
								name='email'
								placeholder='Correo'
								value={form.email}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
						<div>
							<label className='block font-medium'>Teléfono</label>
							<input
								name='telefono'
								placeholder='Teléfono'
								value={form.telefono}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
					</div>
					<div className='py-3'>
						<label className='block font-medium'>Contraseña</label>
						<input
							name='password'
							type='password'
							placeholder='Contraseña'
							value={form.password}
							onChange={handleChange}
							className='w-full border p-2 rounded'
							required
						/>
					</div>

					<h3 className='text-xl font-semibold text-gray-800'>
						Datos del odontólogo
					</h3>
					<div className='py-2'>
						<label className='block font-medium'>Epecialización</label>
						<input
							name='especialidad'
							placeholder='Si tiene más de una especialidad separelas con una coma(,) '
							value={form.especialidad}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>
					<div></div>
					<div className='grid grid-cols-2 gap-5 py-3'>
						<div>
							<label className='block font-medium'>Matrícula profesional</label>
							<input
								name='numeroLicencia'
								placeholder='Número de licencia'
								value={form.numeroLicencia}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
						<div>
							<label className='block font-medium'>
								Experiencia profesional
							</label>
							<input
								name='trayectoriaProfesional'
								type='number'
								placeholder='Años de experiencia'
								value={form.trayectoriaProfesional}
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
					</div>

					<button
						type='submit'
						className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition'>
						Crear Odontólogo
					</button>
				</form>
			</div>
		</section>
	);
}

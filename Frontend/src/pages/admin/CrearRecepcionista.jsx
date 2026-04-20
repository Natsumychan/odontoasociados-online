import { useState } from "react";
import { crearRecepcionista } from "../../services/administradorService";
import { Section } from "lucide-react";

export default function CrearRecepcionista() {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		email: "",
		documento: "",
		telefono: "",
		password: "",
		turno: "manana",
		oficina: "",
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
				email: form.email,
				documento: form.documento,
				telefono: form.telefono,
				password: form.password,
				rol: "recepcionista",
			},
			recepcionista: {
				turno: form.turno,
				oficina: form.oficina,
			},
		};

		try {
			await crearRecepcionista(data);
			alert("Recepcionista creado correctamente");
		} catch (error) {
			console.error(error);
			alert("Error al crear");
		}
	};

	return (
		<section className='flex justify-center items-center py-12'>
			<div className='bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl'>
				<form onSubmit={handleSubmit}>
					<h2 className='text-3xl font-bold text-[#00439C] text-center mb-6'>
						Crear Recepcionista
					</h2>

					<h3 className='text-xl font-semibold text-gray-800'>
						Datos generales
					</h3>
					<div className='grid grid-cols-2 gap-5'>
						<div>
							<label className='block font-medium'>Nombre</label>
							<input
								name='nombre'
								placeholder='Nombre'
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
						<div>
							<label className='block font-medium'>Apellidos</label>
							<input
								name='apellido'
								placeholder='Apellido'
								onChange={handleChange}
								className='w-full border p-2 rounded'
							/>
						</div>
					</div>
					<div className='py-3'>
						<label className='block font-medium'>Cédula *</label>
						<input
							className='w-full border p-2 rounded'
							name='documento'
							placeholder='Documento'
							onChange={handleChange}
							required
						/>
					</div>
					<div className='grid grid-cols-2 gap-5'>
						<div>
							<label className='block font-medium'>Correo</label>
							<input
								className='w-full border p-2 rounded'
								name='email'
								placeholder='Correo'
								onChange={handleChange}
							/>
						</div>
						<div>
							<label className='block font-medium'>Teléfono</label>
							<input
								className='w-full border p-2 rounded'
								name='telefono'
								placeholder='Teléfono'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='py-3'>
						<label className='block font-medium'>Contraseña *</label>
						<input
							className='w-full border p-2 rounded'
							name='password'
							type='password'
							placeholder='Contraseña'
							onChange={handleChange}
							required
						/>
					</div>
					<h3 className='text-xl font-semibold text-gray-800'>
						Datos recepcionista
					</h3>
					<div className='grid grid-cols-2 gap-5 py-3'>
						<div>
							<label className='block font-medium'>Turno </label>
							<select
								className='w-full border p-[10.25px] rounded'
								name='turno'
								onChange={handleChange}>
								<option value='manana'>Mañana</option>
								<option value='tarde'>Tarde</option>
							</select>
						</div>
						<div>
							<label className='block font-medium'>Oficina </label>
							<input
								className='w-full border p-2 rounded'
								name='oficina'
								placeholder='Oficina'
								onChange={handleChange}
							/>
						</div>
					</div>

					<button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition'>Crear recepcionista</button>
				</form>
			</div>
		</section>
	);
}

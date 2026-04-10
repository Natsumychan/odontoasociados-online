import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
	isValidEmail,
	isValidPhone,
	isRequired,
} from "../utils/validationUtils";

const Register = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [form, setForm] = useState({
		nombreCompleto: "",
		cedula: "",
		fechaNacimiento: "",
		celular: "",
		correo: "",
		contrasena: "",
		confirmarContrasena: "",
		gruposanguineo: "",
		alergias: "Ninguna",
		medicamentoAlergias: "",
		eps: "",
	});

	const [errors, setErrors] = useState({});

	// Manejo de cambios
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Validación
	const validateForm = () => {
		const newErrors = {};

		if (!isRequired(form.nombreCompleto))
			newErrors.nombreCompleto = "El nombre completo es obligatorio.";
		if (!isRequired(form.cedula))
			newErrors.cedula = "La cédula es obligatoria.";
		if (!isRequired(form.fechaNacimiento))
			newErrors.fechaNacimiento = "Debe ingresar su fecha de nacimiento.";
		if (!isValidPhone(form.celular))
			newErrors.celular = "Ingrese un número de celular válido.";
		if (!isValidEmail(form.correo))
			newErrors.correo = "Ingrese un correo electrónico válido.";
		if (!isRequired(form.contrasena))
			newErrors.contrasena = "La contraseña es obligatoria.";
		if (form.contrasena !== form.confirmarContrasena)
			newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
		if (!isRequired(form.gruposanguineo))
			newErrors.gruposanguineo = "El valor del grupo sanguineo es inválido.";
		if (!isRequired(form.eps))
			newErrors.eps = "El nombre de la EPS es obligatorio.";

		return newErrors;
	};

	// Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setErrors({});

		// Separar nombre y apellido
		const [nombre, ...resto] = form.nombreCompleto.trim().split(" ");
		const apellido = resto.join(" ") || "";

		// 🔥 JSON correcto para el backend
		const requestData = {
			usuario: {
				nombre: nombre,
				apellido: apellido,
				email: form.correo,
				documento: form.cedula,
				telefono: form.celular,
				password: form.contrasena,
				rol: "paciente",
			},
			paciente: {
				fechaNacimiento: form.fechaNacimiento,
				grupoSanguineo: form.gruposanguineo,
				alergias: form.alergias ? "tiene alergias" : "",
				medicamentoAlergias: form.medicamentoAlergias,
				eps: form.eps,
			},
		};

		try {
			const response = await fetch("http://localhost:8080/api/pacientes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Error backend:", errorText);
				alert("Error registrando usuario");
				return;
			}

			const usuarioCreado = await response.json();

			// ✅ Login solo UNA vez
			login(usuarioCreado);

			alert("Registro exitoso");
			navigate("/panelUsuario");
		} catch (error) {
			console.error("Error:", error);
			alert("No se pudo conectar con el servidor");
		}
	};

	return (
		<section className='flex justify-center items-center py-12 bg-gray-50'>
			<div className='bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl'>
				<h2 className='text-3xl font-bold text-[#00439C] text-center mb-6'>
					Registro de usuario
				</h2>

				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					{/* Nombre */}
					<div>
						<label className='block font-medium'>Nombre completo *</label>
						<input
							type='text'
							name='nombreCompleto'
							value={form.nombreCompleto}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Cédula */}
					<div>
						<label className='block font-medium'>Cédula *</label>
						<input
							type='text'
							name='cedula'
							value={form.cedula}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Fecha */}
					<div>
						<label className='block font-medium'>Fecha de nacimiento *</label>
						<input
							type='date'
							name='fechaNacimiento'
							value={form.fechaNacimiento}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Celular */}
					<div>
						<label className='block font-medium'>Celular</label>
						<input
							type='tel'
							name='celular'
							value={form.celular}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Correo */}
					<div>
						<label className='block font-medium'>Correo *</label>
						<input
							type='email'
							name='correo'
							value={form.correo}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Contraseña */}
					<div>
						<label className='block font-medium'>Contraseña *</label>
						<input
							type='password'
							name='contrasena'
							value={form.contrasena}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* Confirmar */}
					<div>
						<label className='block font-medium'>Confirmar contraseña *</label>
						<input
							type='password'
							name='confirmarContrasena'
							value={form.confirmarContrasena}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>

					{/* grupo sanguineo */}
					<div>
						<label className='block font-medium'>Grupo sanguineo</label>
						<select
							name='gruposanguineo'
							placeholder='Selecciona tu tipo de sangre'
							value={form.gruposanguineo}
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
						<label>¿Alergia?</label>
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
						Registrar
					</button>

					<p className='text-center text-sm'>
						¿Ya tienes cuenta?{" "}
						<Link
							to='/iniciar-sesion'
							className='text-blue-600'>
							Iniciar sesión
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Register;

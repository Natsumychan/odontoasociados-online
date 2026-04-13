import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/authService";
import { Eye, EyeClosed } from "lucide-react";

const LoginSection = () => {
	const [tab, setTab] = useState("paciente");
	const [password, setPassword] = useState("");
	const [documento, setDocumento] = useState("");
	const [error, setError] = useState("");
	const [loginSuccess, setLoginSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoginSuccess("");

		const result = await loginRequest(documento, password);

		if (!result.success) {
			setError(result.message);
			return;
		}

		// Guardar usuario en AuthContext
		login(result.token, result.role, result.nombre);
		console.log(result);

		setLoginSuccess("Ingreso exitoso. ¡Bienvenido!");
		// Redirigir según tab
		if (tab === "paciente") {
			navigate("/panelUsuario");
		} else {
			navigate("/panelMedico");
		}
	};

	return (
		<section className='flex justify-evenly items-center w-full py-16 bg-blue-100'>
			<div className='max-w-7xl w-full flex flex-col md:gap-40 md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8 px-4'>
				{/* Texto informativo */}
				<div className='flex-1 w-1/2'>
					<h3 className='text-3xl font-bold mb-4 text-gray-900'>
						Cuidado dental profesional para toda la familia
					</h3>
					<p className='text-gray-600 mb-4'>
						Bienvenido a <strong>Odontólogos Asociados</strong>, donde
						combinamos tecnología avanzada y atención personalizada para
						ofrecerle la mejor experiencia dental.
					</p>
					<div className='flex gap-3 text-lg text-gray-700 flex-wrap'>
						<span>✅ Citas en línea</span>
						<span>✅ Tecnología avanzada</span>
						<span>✅ Profesionales certificados</span>
					</div>
				</div>

				{/* Formulario */}
				<div className='flex-1 w-1/2 bg-white rounded-2xl shadow-md p-6'>
					<div className='flex border-b mb-4'>
						<button
							className={`flex-1 py-2 font-semibold ${
								tab === "paciente"
									? "border-b-2 border-[#00439C] text-[#00439C]"
									: "text-gray-500"
							}`}
							onClick={() => setTab("paciente")}>
							Pacientes
						</button>
						<button
							className={`flex-1 py-2 font-semibold ${
								tab === "medico"
									? "border-b-2 border-[#00439C] text-[#00439C]"
									: "text-gray-500"
							}`}
							onClick={() => setTab("medico")}>
							Personal médico
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className='space-y-4'>
						{error ? (
							<div className='bg-red-100 text-red-700 p-2 rounded text-sm'>
								{error}
							</div>
						) : (
							<div className='bg-white-100 text-green-700 p-2 rounded text-sm'>
								{loginSuccess}
							</div>
						)}
						<h2 className='text-2xl text-center font-semibold'>
							{tab === "paciente"
								? "Iniciar sesión como paciente"
								: "Iniciar sesión como equipo de trabajo"}
						</h2>
						<div>
							<label className='text-sm font-medium'>Cédula</label>
							<input
								type='text'
								placeholder='escriba su documento'
								value={documento}
								onChange={(e) => setDocumento(e.target.value)}
								className='w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-[#00439C] outline-none'
								required
							/>
						</div>

						{/* Campo de contraseña con toggle */}
						<label className='text-sm font-medium'>Contraseña</label>
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								placeholder='Contraseña'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-[#00439C] outline-none'
							/>
							<button
								type='button'
								onClick={togglePasswordVisibility}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00439C]'>
								{showPassword ? <EyeClosed /> : <Eye />}
							</button>
						</div>

						<div className='flex justify-between items-center text-sm'>
							<label className='flex items-center gap-2'>
								<input type='checkbox' /> Recordarme
							</label>
							<Link
								to='/recuperar-clave'
								className='text-[#00439C] hover:underline'>
								¿Olvidó su contraseña?
							</Link>
						</div>

						<button
							type='submit'
							className='w-full bg-[#00439C] text-white py-2 rounded-md hover:bg-[#00347a] transition'>
							Iniciar sesión
						</button>

						<p className='text-center text-sm mt-2'>
							¿No tiene cuenta?{" "}
							<Link
								to='/registro'
								className='text-[#00439C] hover:underline'>
								Regístrese
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};

export default LoginSection;

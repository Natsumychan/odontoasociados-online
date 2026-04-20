import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../services/authService.js";
import { Eye, EyeClosed } from "lucide-react";

const LoginAdmin = () => {
	const [tab, setTab] = useState("administrador");
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
		login(result.token, result.role, result.nombre, result.idUsuario);
		console.log(result);

		setLoginSuccess("Ingreso exitoso. ¡Bienvenido!");
		// Redirigir según tab
		if (tab === "administrador") {
			navigate("/adminDashboard");
		} else {
			navigate("/");
		}
	};

	return (
		<section className='fixed flex justify-evenly items-center w-full h-full py-16 bg-blue-100'>
			<div className='w-1/2 h-full flex flex-col md:gap-40 md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8 px-4'>
				{/* Formulario */}
				<div className='flex-1 -mt-68.75  bg-white rounded-2xl shadow-md p-6'>
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
							Admininstrador
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
						<div className='flex items-center justify-center'>
							<button
								type='submit'
								className='w-1/2 bg-[#00439C] text-white py-2 rounded-md hover:bg-[#00347a] transition'>
								Iniciar sesión
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default LoginAdmin;

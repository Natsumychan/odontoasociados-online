import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//permite compartir datos (como estado, funciones o preferencias) a través del árbol de componentes sin tener que pasar manualmente las props en cada nivel
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	// 🔐 LOGIN REAL
	const login = (token, role, nombre) => {
		localStorage.setItem("token", token);
		localStorage.setItem("role", role);
		localStorage.setItem("nombre", nombre);

		setUser({ role, nombre });
		setIsAuthenticated(true);

		// Redirección automática
		if (role === "paciente") {
			navigate("/panelUsuario");
		} else {
			navigate("/panelPersonal");
		}
	};

	// 🚪 LOGOUT
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");

		setUser(null);
		setIsAuthenticated(false);

		navigate("/");
	};

	// 🔄 RESTAURAR SESIÓN
	useEffect(() => {
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");
    const nombre = localStorage.getItem("nombre");

		if (token && role) {
			setUser({ role,nombre });
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//permite compartir datos (como estado, funciones o preferencias) a través del árbol de componentes sin tener que pasar manualmente las props en cada nivel
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ahora guardamos datos del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // 🔹 Al iniciar sesión
  const login = (email, password, role) => {
    setLoading(true);

  return new Promise((resolve) => {
      setTimeout(() => {
        // Ejemplo simple de validación (puedes reemplazar con API real)
        if (email && password) {
          const loggedUser = { email, role };
          setUser(loggedUser);
          setIsAuthenticated(true);
          setLoading(false);
          resolve(true);
          navigate(role === "paciente" ? "/panelUsuario" : "/panelPersonal");
        } else {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  // 🔹 Al cerrar sesión
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 Recuperación de contraseña simulada
  const recoverPassword = async (email) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (email.includes("@")) {
          setLoading(false);
          resolve("Se ha enviado un enlace de recuperación a tu correo.");
        } else {
          setLoading(false);
          reject("El correo ingresado no es válido.");
        }
      }, 1500);
    });
  };

  // 🔹 Restaurar sesión desde sessionStorage al cargar la app
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, recoverPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

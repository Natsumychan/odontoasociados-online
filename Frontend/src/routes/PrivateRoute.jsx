import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6 text-gray-600">Cargando...</div>;

  if (!isAuthenticated) {
    // Guardar ubicación actual para volver después de login
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Si hay restricción de rol y no coincide, redirigir al dashboard propio
  if (role && user?.role !== role) {
    return (
      <Navigate
        to={user.role === "paciente" ? "/panelUsuario" : "/dashboardMedico"}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
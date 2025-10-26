import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isRequired } from "../utils/validationUtils";

const ResetPassword = () => {
  const { loading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔹 Enlace de verificación (simulado)
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("El enlace de restablecimiento no es válido o ha expirado.");
      return;
    }

    if (!isRequired(password) || !isRequired(confirmPassword)) {
      setError("Por favor complete todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simula restablecimiento exitoso
    setTimeout(() => {
      setMessage("Tu contraseña ha sido actualizada correctamente.");
      setTimeout(() => navigate("/"), 2000);
    }, 1500);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#00439C] mb-2">
          Restablecer contraseña
        </h2>
        <p className="text-gray-600 mb-6">
          Ingresa tu nueva contraseña para acceder nuevamente a tu cuenta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="text-sm font-medium">Nueva contraseña</label>
            <input
              type="password"
              placeholder="Ingrese una nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                error ? "border-red-500 focus:ring-red-300" : "focus:ring-[#00439C]"
              }`}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirme la nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                error ? "border-red-500 focus:ring-red-300" : "focus:ring-[#00439C]"
              }`}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm font-medium">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#00439C] text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#00347a]"
            }`}
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-[#00439C] font-semibold hover:underline text-sm"
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validationUtils";

const PasswordRecovery = () => {
  const { recoverPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // ✅ Validación de correo electrónico
    if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      // 🔹 Simula envío de correo con enlace de restablecimiento
      setTimeout(() => {
        const simulatedLink = `/restablecer-clave?token=abc123`;
        setMessage(
          <>
            Se ha enviado un enlace a tu correo. <br />
            Puedes usar este enlace simulado:{" "}
            <Link
              to={simulatedLink}
              className="text-[#00439C] font-semibold hover:underline"
            >
              {simulatedLink}
            </Link>
          </>
        );
      }, 1500);

      // 🔹 Si tienes lógica real de recuperación, se ejecuta aquí
      const response = await recoverPassword(email);
      if (response) {
        setMessage(response);
      }

      setEmail("");
    } catch (err) {
      setError(
        err?.message ||
          "Ocurrió un error al intentar enviar las instrucciones. Inténtalo nuevamente."
      );
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#00439C] mb-2">
          Recuperación de clave
        </h2>
        <p className="text-gray-600 mb-6">
          Ingresa tu dirección de correo electrónico y te enviaremos las
          instrucciones para recuperar tu clave.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-md p-2 text-center focus:ring-2 outline-none ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-[#00439C]"
            }`}
          />

          {/* 🔸 Mensajes de error o confirmación */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && (
            <p className="text-green-600 text-sm font-medium">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#00439C] text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#00347a]"
            }`}
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>

        <div className="mt-4">
          <Link
            to="/"
            className="text-[#00439C] font-semibold hover:underline text-sm"
          >
            Regresar a inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PasswordRecovery;

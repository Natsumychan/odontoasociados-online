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
  const { login } = useAuth(); // 👉 Usamos el contexto de autenticación

  const [form, setForm] = useState({
    nombreCompleto: "",
    cedula: "",
    fechaNacimiento: "",
    celular: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    alergia: false,
    medicamento: "",
    eps: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Validación completa usando las utilidades
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
    if (!isRequired(form.eps))
      newErrors.eps = "El nombre de la EPS es obligatorio.";

    return newErrors;
  };

  // ✅ Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si no hay errores, limpiamos y simulamos registro
    setErrors({});

    const newUser = {
      nombreCompleto: form.nombreCompleto,
      cedula: form.cedula,
      fechaNacimiento: form.fechaNacimiento,
      celular: form.celular,
      correo: form.correo,
      contrasena: form.contrasena,
      alergia: form.alergia,
      medicamento: form.medicamento,
      eps: form.eps,
    };

    // Simular guardado en localStorage o API
    localStorage.setItem("odonto_user", JSON.stringify(newUser));

    // ✅ Autenticación automática
    login(newUser);

    alert("Registro exitoso. ¡Bienvenido/a!");
    navigate("/panelUsuario");
  };

  return (
    <section className="flex justify-center items-center py-12 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-[#00439C] text-center mb-6">
          Registro de usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre completo */}
          <div>
            <label className="block font-medium text-gray-700">
              Nombre completo *
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={form.nombreCompleto}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.nombreCompleto
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.nombreCompleto && (
              <p className="text-red-500 text-sm mt-1">{errors.nombreCompleto}</p>
            )}
          </div>

          {/* Cédula */}
          <div>
            <label className="block font-medium text-gray-700">Cédula *</label>
            <input
              type="text"
              name="cedula"
              value={form.cedula}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.cedula
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.cedula && (
              <p className="text-red-500 text-sm mt-1">{errors.cedula}</p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block font-medium text-gray-700">
              Fecha de nacimiento *
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.fechaNacimiento
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.fechaNacimiento && (
              <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
            )}
          </div>

          {/* Celular */}
          <div>
            <label className="block font-medium text-gray-700">
              Número de celular
            </label>
            <input
              type="tel"
              name="celular"
              placeholder="Ej: 3101234567"
              value={form.celular}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.celular
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.celular && (
              <p className="text-red-500 text-sm mt-1">{errors.celular}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block font-medium text-gray-700">Correo *</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.correo
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block font-medium text-gray-700">
              Contraseña *
            </label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.contrasena
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.contrasena && (
              <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block font-medium text-gray-700">
              Confirmar contraseña *
            </label>
            <input
              type="password"
              name="confirmarContrasena"
              value={form.confirmarContrasena}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.confirmarContrasena
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.confirmarContrasena && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmarContrasena}
              </p>
            )}
          </div>

          {/* Alergia */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="alergia"
              checked={form.alergia}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-gray-700 font-medium">
              ¿Alergia a medicamentos? *
            </label>
          </div>

          {/* Medicamento */}
          {form.alergia && (
            <div>
              <label className="block font-medium text-gray-700">
                Nombre del medicamento
              </label>
              <input
                type="text"
                name="medicamento"
                placeholder="Solo si tiene alergia"
                value={form.medicamento}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-[#00439C] outline-none"
              />
            </div>
          )}

          {/* EPS */}
          <div>
            <label className="block font-medium text-gray-700">
              Nombre de su EPS *
            </label>
            <input
              type="text"
              name="eps"
              value={form.eps}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 mt-1 focus:ring-2 outline-none ${
                errors.eps
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-[#00439C]"
              }`}
            />
            {errors.eps && (
              <p className="text-red-500 text-sm mt-1">{errors.eps}</p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#00439C] text-white font-semibold py-2 rounded-md hover:bg-[#00347a] transition"
          >
            Registrar
          </button>

          {/* Link a login */}
          <p className="text-center text-sm mt-2">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/iniciar-sesion"
              className="text-[#00439C] font-semibold hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;

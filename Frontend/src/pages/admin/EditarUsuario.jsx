import { useState, useEffect } from "react";
import { actualizarUsuario } from "../../services/usuarioService";
import { actualizarOdontologo } from "../../services/odontologoService";
// luego agregas los otros services

export default function EditarUsuario({
	usuarioSeleccionado,
	onClose,
	onActualizado,
}) {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		email: "",
		telefono: "",
		documento: "",
		password: "",
		rol: "",

		// datos específicos
		especialidad: "",
		numeroLicencia: "",
		trayectoriaProfesional: "",

		turno: "",
		oficina: "",

		grupoSanguineo: "",
		eps: "",
	});

	useEffect(() => {
		if (usuarioSeleccionado) {
			setForm({
				nombre: usuarioSeleccionado.nombre || "",
				apellido: usuarioSeleccionado.apellido || "",
				email: usuarioSeleccionado.email || "",
				telefono: usuarioSeleccionado.telefono || "",
				documento: usuarioSeleccionado.documento || "",
				password: "",
				rol: usuarioSeleccionado.rol || "",

				// aquí deberías cargar datos extra si los traes del backend
				especialidad: usuarioSeleccionado.especialidad || "",
				numeroLicencia: usuarioSeleccionado.numeroLicencia || "",
				trayectoriaProfesional:
					usuarioSeleccionado.trayectoriaProfesional || "",

				turno: usuarioSeleccionado.turno || "",
				oficina: usuarioSeleccionado.oficina || "",

				grupoSanguineo: usuarioSeleccionado.grupoSanguineo || "",
				eps: usuarioSeleccionado.eps || "",
			});
		}
	}, [usuarioSeleccionado]);

	// cerrar con ESC
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// 1️⃣ actualizar usuario base
			await actualizarUsuario(usuarioSeleccionado.id, {
				nombre: form.nombre,
				apellido: form.apellido,
				email: form.email,
				telefono: form.telefono,
				documento: form.documento,
				password: form.password || null,
				rol: form.rol,
			});

			// 2️⃣ actualizar según rol
			if (form.rol === "odontologo") {
				await actualizarOdontologo(usuarioSeleccionado.id, {
					especialidad: form.especialidad,
					numeroLicencia: form.numeroLicencia,
					trayectoriaProfesional: parseInt(form.trayectoriaProfesional),
				});
			}

			// (luego agregas los demás cuando crees endpoints)

			onActualizado();
			onClose();
		} catch (error) {
			console.error(error);
			alert("Error al actualizar");
		}
	};

	return (
  <div className="fixed inset-0 z-9999 flex items-center justify-center">

    {/* 🔴 Overlay */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    ></div>

    {/* 🟢 Modal */}
    <div
      className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 z-10"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Editar Usuario
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="input" />
          <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" className="input" />
        </div>

        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" className="input" />

        <div className="grid grid-cols-2 gap-3">
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="input" />
          <input name="documento" value={form.documento} onChange={handleChange} placeholder="Documento" className="input" />
        </div>

        <select name="rol" value={form.rol} onChange={handleChange} className="input">
          <option value="paciente">Paciente</option>
          <option value="odontologo">Odontólogo</option>
          <option value="recepcionista">Recepcionista</option>
          <option value="administrador">Administrador</option>
        </select>

        {/* 🔵 CAMPOS DINÁMICOS */}

        {form.rol === "odontologo" && (
          <>
            <input name="especialidad" value={form.especialidad} onChange={handleChange} placeholder="Especialidad" className="input" />
            <input name="numeroLicencia" value={form.numeroLicencia} onChange={handleChange} placeholder="Licencia" className="input" />
            <input name="trayectoriaProfesional" type="number" value={form.trayectoriaProfesional} onChange={handleChange} placeholder="Experiencia" className="input" />
          </>
        )}

        {form.rol === "recepcionista" && (
          <>
            <input name="oficina" value={form.oficina} onChange={handleChange} placeholder="Oficina" className="input" />
            <select name="turno" value={form.turno} onChange={handleChange} className="input">
              <option value="manana">Mañana</option>
              <option value="tarde">Tarde</option>
            </select>
          </>
        )}

        {form.rol === "paciente" && (
          <>
            <input name="grupoSanguineo" value={form.grupoSanguineo} onChange={handleChange} placeholder="Grupo sanguíneo" className="input" />
            <input name="eps" value={form.eps} onChange={handleChange} placeholder="EPS" className="input" />
          </>
        )}

        {/* Password (solo una vez) */}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nueva contraseña (opcional)"
          className="input"
        />

        {/* Botones */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#00439C] text-white hover:bg-[#003080] shadow"
          >
            Guardar cambios
          </button>
        </div>

      </form>
    </div>
  </div>
);
}

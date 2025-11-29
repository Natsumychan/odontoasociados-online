import { useState } from "react";

const NewAppointment = () => {
  const [formData, setFormData] = useState({
    idPaciente: 1,
    idOdontologo: null,
    idTratamiento: null,
    fecha: "",
    hora: "",
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manejar odontólogo
    if (name === "idOdontologo") {
      setFormData((prev) => ({
        ...prev,
        idOdontologo: value ? Number(value) : null,
      }));
      return;
    }

    // Manejar tratamientos (arreglo)
    if (name === "tratamientosIds") {
      setFormData((prev) => ({
        ...prev,
        idTratamiento: value ? Number(value) : null,
      }));
      return;
    }

    // Resto de campos
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Crear cita ---
  const handleConfirmar = async () => {
    console.log(formData)
    // Validaciones antes de enviar
    if (!formData.idOdontologo) {
      alert("Por favor selecciona un odontólogo.");
      return;
    }
    if (!formData.idTratamiento) {
      alert("Por favor selecciona un tratamiento.");
      return;
    }
    if (!formData.fecha) {
      alert("Selecciona una fecha para la cita.");
      return;
    }
    if (!formData.hora) {
      alert("Selecciona una hora para la cita.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.text();

        console.error("Backend error:", err);
        throw new Error("Error creando la cita");
      }

      const data = await response.json();
      alert("Cita creada correctamente");
      console.log("Cita creada:", data);

      // Reset del formulario
      setFormData({
        idPaciente: 1,
        idOdontologo: "",
        idTratamiento: "",
        fecha: "",
        hora: "",
        comentario: "",
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la cita.");
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Agendar cita
          </h1>

          <div className="space-y-6">

            {/* Odontólogo */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Odontólogo
              </label>
              <select
                name="idOdontologo"
                value={formData.idOdontologo ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione...</option>
                <option value="2">Dra. Laura Gómez</option>
                <option value="4">Dr. James Echavarría</option>
                <option value="5">Dra. Sara Martínez</option>
                <option value="6">Dr. Carlos Rodríguez</option>
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Hora */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Hora
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tratamiento */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Servicio / Tratamiento
              </label>
              <select
                name="tratamientosIds"
                value={formData.idTratamiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione...</option>
                <option value="1">Examen oral</option>
                <option value="2">Limpieza dental</option>
                <option value="3">Extracción</option>
                <option value="4">Ortodoncia</option>
                <option value="5">Endodoncia</option>
                <option value="6">Blanqueamiento</option>
              </select>
            </div>

            {/* Motivo */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Comentario
              </label>
              <textarea
                name="motivo"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Detalles adicionales"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Botón Confirmar */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmar}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
              >
                Confirmar cita
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;



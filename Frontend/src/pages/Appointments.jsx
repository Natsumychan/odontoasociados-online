import { useEffect, useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isReprogramModalOpen, setReprogramModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const pacienteId = 1; // 🔹 paciente ejemplo (luego se tomará del login)

  // 🔹 Cargar citas reales desde backend
  useEffect(() => {
    const fetchAppointments = async () => {

      try {
        const res = await fetch(
          `http://localhost:8080/api/citas/paciente/${pacienteId}`
        );

        if (!res.ok) throw new Error("Error consultando citas");

        const data = await res.json();
        console.log("Respuesta bruta del backend:", data);
        // Adaptación: backend devuelve fecha/hora separadas
        const mapped = data.map((cita) => ({
          id: cita.id,
          idDoctor: cita.odontologoId,
          doctor: cita.odontologoNombre || `Odontólogo #${cita.odontologoId}`,
          idPaciente: cita.pacienteId,
          date: cita.fecha,
          time: cita.hora,
          idService: cita.tratamientoId,
          service: cita.tratamientoNombre || `Tratamiento #${cita.tratamientoId}`,
        }));
        setAppointments(mapped);
      } catch (err) {
        console.error(err);
        alert("Error cargando citas");
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 Abrir modal de reprogramación
  const openReprogramModal = (appt) => {
    console.log("OBJETO COMPLETO DE LA CITA SELECCIONADA:", appt);
    setSelectedAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setReprogramModalOpen(true);
  };

  // 🔹 Confirmar reprogramación (PUT al backend)
  const handleReprogram = async () => {

    console.log(selectedAppointment.id)
    console.log(selectedAppointment.idService)
    try {
      const res = await fetch(
        `http://localhost:8080/api/citas/${selectedAppointment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: selectedAppointment.id,
            idPaciente: selectedAppointment.idPaciente,
            idOdontologo: selectedAppointment.idDoctor,
            fecha: newDate,
            hora: newTime,
            comentario:"",
            idTratamiento: selectedAppointment.idService,

          }),
        }
      );

      if (!res.ok) throw new Error("Error reprogramando cita");

      const updated = await res.json();

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id
            ? { ...appt, date: updated.fecha, time: updated.hora }
            : appt
        )
      );

      setReprogramModalOpen(false);
      alert("Cita reprogramada con éxito");
    } catch (err) {
      console.error(err);
      alert("No se pudo reprogramar la cita");
    }
  };

  // 🔹 Abrir modal de cancelación
  const openCancelModal = (appt) => {
    setSelectedAppointment(appt);
    setCancelModalOpen(true);
  };

  // 🔹 Confirmar cancelación: POST /cancel
  const handleCancel = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/citas/${selectedAppointment.id}/cancel`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Error cancelando cita");

      setAppointments((prev) =>
        prev.filter((appt) => appt.id !== selectedAppointment.id)
      );

      setCancelModalOpen(false);
      alert("Cita cancelada");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar la cita");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-[#00439C] text-center mb-8">
        Mis citas
      </h2>

      <div className="space-y-6">
        {appointments.length === 0 && (
          <p className="text-center text-gray-600">No tienes citas registradas.</p>
        )}

        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cita con {appt.doctor}
              </h3>
              <p className="text-gray-700"><strong>Fecha:</strong> {appt.date}</p>
              <p className="text-gray-700"><strong>Hora:</strong> {appt.time}</p>
              <p className="text-gray-700"><strong>Servicio:</strong> {appt.service}</p>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button
                onClick={() => openReprogramModal(appt)}
                className="w-[120px] border border-[#00439C] text-[#00439C] font-medium px-4 py-2 rounded-md hover:bg-[#00439C] hover:text-white transition"
              >
                Reprogramar
              </button>

              <button
                onClick={() => openCancelModal(appt)}
                className="w-[120px] bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de reprogramar */}
      {isReprogramModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#00439C] mb-4">
              Reprogramar cita con {selectedAppointment?.doctor}
            </h3>

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border p-2 mb-4 rounded-md"
            />

            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border p-2 mb-6 rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReprogramModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancelar
              </button>

              <button
                onClick={handleReprogram}
                className="px-4 py-2 bg-[#00439C] text-white rounded-md"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cancelar */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-semibold text-[#00439C] mb-4">
              ¿Deseas cancelar esta cita?
            </h3>

            <p className="text-gray-600 mb-6">
              Cita con {selectedAppointment?.doctor} el{" "}
              <strong>{selectedAppointment?.date}</strong> a las{" "}
              <strong>{selectedAppointment?.time}</strong>
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;



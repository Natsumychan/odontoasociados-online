import React, { useState } from "react";

const Appointments = () => {
  // 🔹 Datos simulados de citas (puedes reemplazarlos por datos reales del backend)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Amanda García",
      date: "2025-07-12",
      time: "10:00 AM",
      service: "Limpieza dental",
    },
    {
      id: 2,
      doctor: "Dr. James Echavarría",
      date: "2025-08-03",
      time: "2:30 PM",
      service: "Extracción de diente",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isReprogramModalOpen, setReprogramModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // 🔹 Abrir modal de reprogramación
  const openReprogramModal = (appt) => {
    setSelectedAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setReprogramModalOpen(true);
  };

  // 🔹 Confirmar reprogramación
  const handleReprogram = () => {
    if (!newDate || !newTime) return alert("Por favor selecciona fecha y hora.");
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedAppointment.id
          ? { ...appt, date: newDate, time: newTime }
          : appt
      )
    );
    setReprogramModalOpen(false);
    alert("✅ La cita fue reprogramada con éxito.");
  };

  // 🔹 Abrir modal de cancelación
  const openCancelModal = (appt) => {
    setSelectedAppointment(appt);
    setCancelModalOpen(true);
  };

  // 🔹 Confirmar cancelación
  const handleCancel = () => {
    setAppointments((prev) =>
      prev.filter((appt) => appt.id !== selectedAppointment.id)
    );
    setCancelModalOpen(false);
    alert("❌ La cita fue cancelada.");
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-[#00439C] text-center mb-8">
        Mis citas
      </h2>

      <div className="space-y-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
          >
            {/* Información */}
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cita con {appt.doctor}
              </h3>
              <p className="text-gray-700">
                <strong>Fecha:</strong> {appt.date}
              </p>
              <p className="text-gray-700">
                <strong>Hora:</strong> {appt.time}
              </p>
              <p className="text-gray-700">
                <strong>Servicio:</strong> {appt.service}
              </p>
            </div>

            {/* Botones */}
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

      {/* 🔹 MODAL DE REPROGRAMAR */}
      {isReprogramModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#00439C] mb-4">
              Reprogramar cita con {selectedAppointment?.doctor}
            </h3>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva fecha
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-[#00439C] focus:border-[#00439C]"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva hora
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:ring-[#00439C] focus:border-[#00439C]"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReprogramModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleReprogram}
                className="px-4 py-2 rounded-md bg-[#00439C] text-white hover:bg-[#003680]"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 MODAL DE CONFIRMACIÓN DE CANCELAR */}
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
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
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


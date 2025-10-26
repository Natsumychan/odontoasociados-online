

const MedicalHistory = () => {
const appointments = [
    {
      id: 1,
      title: "Limpieza dental",
      date: "Apr 12, 2024",
      doctor: "Dr. James Echavarría",
      description: "Limpieza de rutina"
    },
    {
      id: 2,
      title: "Canal radicular",
      date: "Mar 8, 2024",
      doctor: "Dr. Sara Martínez",
      description: "Terminado el canal radicular del diente #14"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Historial Médico
          </h1>

          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {appointment.title}- {appointment.date}
                </h2>
                <p className="text-gray-700 mb-1">
                  {appointment.doctor}
                </p>
                <p className="text-gray-700 mb-3">
                  {appointment.description}
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;

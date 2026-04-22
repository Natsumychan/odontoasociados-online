import { useEffect, useState } from "react";

const AgendaCalendar = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await fetch("http://localhost:8080/api/citas/agenda/hoy");
    const data = await res.json();
    setCitas(data);
  };

  const generarBloques = () => {
    let bloques = [];
    let hora = 8 * 60;
    const fin = 18 * 60;

    while (hora < fin) {
      const horaStr = `${String(Math.floor(hora / 60)).padStart(2, "0")}:${String(hora % 60).padStart(2, "0")}`;

      const cita = citas.find(c => c.hora?.startsWith(horaStr));

      bloques.push({
        hora: horaStr,
        cita
      });

      hora += 30;
    }

    return bloques;
  };

  const bloques = generarBloques();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-[600px] overflow-y-auto">

      <h2 className="text-lg font-bold text-[#00439C] mb-4">
        Agenda visual
      </h2>

      <div className="space-y-2">
        {bloques.map((b, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border flex justify-between items-center
              ${b.cita ? "bg-blue-100" : "bg-gray-50"}
            `}
          >
            <span className="font-medium">{b.hora}</span>

            {b.cita ? (
              <div className="text-sm">
                <p className="font-semibold">{b.cita.pacienteNombre}</p>
                <p className="text-gray-600">{b.cita.tratamientosNombres}</p>
              </div>
            ) : (
              <span className="text-gray-400">Disponible</span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AgendaCalendar;
import {
  Calendar,
  MessageSquare,
  Clock,
  Bell,
  Bone,
  CheckCircle,
  CreditCard,
  FileText,
  Info,
} from "lucide-react";
import toothIcon from "../assets/logo/tooth-normal.svg"

const UserPanel = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Bienvenida, Diana</h1>
        <p className="text-gray-600">Lunes, 16 de junio de 2025</p>
      </div>

      {/* Cards superiores */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Próxima cita */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Próxima cita</p>
            <h2 className="text-lg font-bold mt-2">16 de junio, 2025</h2>
            <p className="text-gray-600 text-sm mt-1">
              10:00 AM – Limpieza dental
            </p>
          </div>
          <Calendar size={40} className="text-blue-500" />
        </div>

        {/* Tratamiento actual */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Tratamiento actual</p>
            <h2 className="text-lg font-bold mt-2">Ortodoncia</h2>
            <p className="text-sm text-gray-600 mt-2">Progreso: 60%</p>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-2 bg-green-500 rounded-full w-[60%]" />
            </div>
          </div>
          <img src={toothIcon} alt="Logo" className="w-10 h-10" />
        </div>

        {/* Mensajes */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 font-medium">Mensajes no leídos</p>
            <h2 className="text-lg font-bold mt-2">2 mensajes</h2>
            <p className="text-sm text-gray-600 mt-1">Último: hace 2 horas</p>
          </div>
          <MessageSquare size={40} className="text-purple-500" />
        </div>
      </div>

      {/* Próximas citas */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Próximas citas</h2>
        <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <Calendar size={24} />
            </div>
            <div>
              <p className="font-semibold">Limpieza dental</p>
              <p className="text-sm text-gray-600">
                Dr. Carlos Rodríguez – 15 de junio, 2025 • 10:00 AM
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-200">
              Reprogramar
            </button>
            <button className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600">
              Cancelar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              {/*  */}
              <Bone/>
            </div>
            <div>
              <p className="font-semibold">Radiografía dental</p>
              <p className="text-sm text-gray-600">
                Dra. Ana Martínez – 22 de junio, 2025 • 2:30 PM
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-200">
              Reprogramar
            </button>
            <button className="bg-red-500 px-3 py-1 rounded-lg text-white hover:bg-red-600">
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Actividad reciente y recordatorios */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Actividad reciente */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Actividad reciente</h2>
          <ul className="space-y-3">
            {[
              {
                icon: <FileText className="text-blue-500" />,
                text: "Resultados de rayos X disponibles",
                time: "Hace 2 días",
              },
              {
                icon: <CheckCircle className="text-green-500" />,
                text: "Cita completada: Revisión de ortodoncia",
                time: "Hace 1 semana",
              },
              {
                icon: <MessageSquare className="text-purple-500" />,
                text: "Mensaje enviado al Dr. García",
                time: "Hace 1 semana",
              },
              {
                icon: <CreditCard className="text-yellow-500" />,
                text: "Pago realizado: $150.000",
                time: "Hace 2 semanas",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 border-b pb-3">
                <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>
                <div>
                  <p className="font-medium">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recordatorios */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recordatorios y consejos
          </h2>
          <ul className="space-y-3">
            {[
              {
                icon: <Bell className="text-red-500" />,
                title: "Recordatorio de medicación",
                desc:
                  "No olvide tomar su medicación antiinflamatoria durante 3 días más.",
              },
              {
                icon:<img src={toothIcon} alt="Logo" className="w-8 h-8" />,
                title: "Consejo de higiene dental",
                desc:
                  "Recuerde cepillar sus dientes después de cada comida y usar hilo dental diariamente.",
              },
              {
                icon: <Calendar className="text-green-500" />,
                title: "Próxima revisión de ortodoncia",
                desc:
                  "Su próximo ajuste de ortodoncia debe programarse para julio.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 border-b pb-3">
                <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progreso del tratamiento */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Progreso del tratamiento</h2>
        <p className="font-semibold">Ortodoncia</p>
        <p className="text-sm text-gray-600 mb-2">
          Iniciado: 10 de enero, 2025
        </p>

        <div className="space-y-2">
          {[
            { label: "Progreso general", value: 60 },
            { label: "Alineación", value: 75 },
            { label: "Corrección de mordida", value: 45 },
          ].map((bar, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm text-gray-700">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    i === 0
                      ? "bg-blue-600"
                      : i === 1
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
          <p className="font-semibold mb-1">Notas del dentista:</p>
          <p>
            El tratamiento de ortodoncia progresa según lo esperado. Los dientes
            frontales superiores han mostrado una excelente respuesta. Continúe
            con el uso de elásticos según las instrucciones para mejorar la
            corrección de la mordida.
          </p>
          <p className="mt-2 text-gray-600 text-xs">
            – Dr. Carlos Rodríguez, 1 de junio, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;

import { Calendar, UserCheck, FileText } from "lucide-react";

const features = [
  {
    icon: <Calendar size={36} className="text-[#00439C]" />,
    title: "Citas en línea",
    text: "Programe sus citas fácilmente desde cualquier dispositivo, en cualquier momento.",
  },
  {
    icon: <UserCheck size={36} className="text-[#00439C]" />,
    title: "Especialistas certificados",
    text: "Nuestro equipo de profesionales altamente calificados está listo para atenderle.",
  },
  {
    icon: <FileText size={36} className="text-[#00439C]" />,
    title: "Historial digital",
    text: "Acceda a su historial dental completo y seguimiento de tratamientos en línea.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#f9fbff] py-12 px-4">
      <h2 className="text-center text-2xl font-bold mb-10 text-gray-900">
        ¿Por qué elegir Odontólogos Asociados?
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-blue-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

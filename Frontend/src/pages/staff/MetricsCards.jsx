import { useEffect, useState } from "react";
import {toast} from "react-toastify";

const MetricsCards = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/citas/dashboard/metrics");
      const data = await res.json();
      setMetrics(data);
    } catch {
      toast.error("Error cargando métricas");
    }
  };

  if (!metrics) return null;

  const cards = [
    { title: "Total hoy", value: metrics.total },
    { title: "Pendientes", value: metrics.pendientes },
    { title: "Realizadas", value: metrics.realizadas },
    { title: "Canceladas", value: metrics.canceladas },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{c.title}</p>
          <p className="text-2xl font-bold text-[#00439C]">{c.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
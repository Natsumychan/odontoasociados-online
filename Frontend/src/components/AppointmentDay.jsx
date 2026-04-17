import { useEffect, useState } from "react";
import { obtenerAgendaDia } from "../services/citaService";

const AppointmentDay = ({ odontologoId, fecha, onSeleccionarHora }) => {
	const [agenda, setAgenda] = useState([]);
	const [bloques, setBloques] = useState([]);
	const [mensaje, setMensaje] = useState("");

	useEffect(() => {
    const fechaSeleccionada = new Date(fecha);
    const dia = fechaSeleccionada.getDay();
    if (dia === 6) {
        alert("No prestamos servicio los domingos");
        return;
    }
		if (odontologoId && fecha) {
			cargarAgenda();
		}
	}, [odontologoId, fecha]);

	const cargarAgenda = async () => {
		try {
			setMensaje(""); // limpiar mensaje anterior

			const citas = await obtenerAgendaDia(odontologoId, fecha);

			setAgenda(citas);
			generarBloques(citas);
		} catch (error) {
			console.error("Error agenda:", error);

			// 🔥 MENSAJE DEL BACKEND
			const msg =
				error.response?.data ||
				"No hay disponibilidad para la fecha seleccionada";

			setMensaje(msg);
			setBloques([]); // limpiar bloques
		}
	};

	// 🔥 Generar bloques tipo calendario
	const generarBloques = (citas) => {
		let bloquesDia = [];

		let hora = 8 * 60; // minutos (08:00)
		const fin = 18 * 60;

		while (hora < fin) {
			const horaStr = `${String(Math.floor(hora / 60)).padStart(2, "0")}:${String(hora % 60).padStart(2, "0")}`;

			let ocupado = false;
      let esAlmuerzo = false;
			let citaActual = null;

      // 🚫 BLOQUEAR ALMUERZO (12:00 - 13:00)
      if (hora >= 12 * 60 && hora < 13 * 60) {
        esAlmuerzo = true;
        ocupado = true;
      }

			for (let c of citas) {
				const inicio = parseHora(c.hora);
				const duracion = 60; // 🔥 luego puedes traerla del backend
				const finCita = inicio + duracion;

				if (hora >= inicio && hora < finCita) {
					ocupado = true;
					citaActual = c;
					break;
				}
			}

			bloquesDia.push({
				hora: horaStr,
				ocupado,
        esAlmuerzo,
				cita: citaActual,
			});

			hora += 30;
		}

		setBloques(bloquesDia);
	};

	const parseHora = (horaStr) => {
		const [h, m] = horaStr.split(":").map(Number);
		return h * 60 + m;
	};

	return (
		<div className='border rounded-lg overflow-hidden'>
			{mensaje ? (
				<div>
          <p className="text-red-600 font-semibold text-lg mb-2">
            ⚠️ No disponible
          </p>
					<p className='p-4 text-center text-red-600 font-medium'>{mensaje}</p>
				</div>
			) : (
				bloques.map((b, i) => (
					<div
						key={i}
						onClick={() => !b.ocupado && !b.esAlmuerzo && onSeleccionarHora(b.hora)}
						className={`flex justify-between px-4 py-2 border-b cursor-pointer
          ${
						b.esAlmuerzo
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : b.ocupado
            ? "bg-red-100 text-gray-500 cursor-not-allowed"
            : "hover:bg-green-100"
					}
        `}>
						<span>{b.hora}</span>

						{b.esAlmuerzo ? (
              <span className="font-medium">Horario de almuerzo</span>
            ) : b.ocupado ? (
              <span>
              Ocupado - {b.cita?.tratamientoNombre}
              </span>
            ) : (
            <span className="text-green-600">Disponible</span>
            )}
					</div>
				))
			)}
		</div>
	);
};

export default AppointmentDay;

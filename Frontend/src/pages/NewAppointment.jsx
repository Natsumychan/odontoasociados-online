import { useState } from 'react';
import { Bell, User } from 'lucide-react';

const NewAppointment = () => {
  const [formData, setFormData] = useState({
    odontologo: '',
    fecha: '',
    hora: '',
    servicio: '',
    comentario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReprogramar = () => {
    console.log('Reprogramar cita:', formData);
    alert('Cita reprogramada');
  };

  const handleConfirmar = () => {
    console.log('Confirmar cita:', formData);
    alert('Cita confirmada exitosamente');
  };

  const handleCancelar = () => {
    setFormData({
      odontologo: '',
      fecha: '',
      hora: '',
      servicio: '',
      comentario: ''
    });
  };

  return (
     <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
              Agendar cita
            </h1>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Odontólogo
                </label>
                <select
                  name="odontologo"
                  value={formData.odontologo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Dr. Amanda García</option>
                  <option value="dr-james">Dr. James Echavarría</option>
                  <option value="dra-sara">Dr. Sara Martínez</option>
                  <option value="dr-carlos">Dr. Carlos Rodríguez</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Hora
                </label>
                <input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  placeholder="--:-- --"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Servicio
                </label>
                <select
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Exámen oral</option>
                  <option value="limpieza">Limpieza dental</option>
                  <option value="extraccion">Extracción</option>
                  <option value="ortodoncia">Ortodoncia</option>
                  <option value="endodoncia">Endodoncia</option>
                  <option value="blanqueamiento">Blanqueamiento</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Comentario
                </label>
                <textarea
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  placeholder="Detalles adicionales"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleReprogramar}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Reprogramar
                </button>

                <button
                  onClick={handleConfirmar}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Confirmar
                </button>

                <button
                  onClick={handleCancelar}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium py-3 px-4 transition-colors"
                >
                  Cancelar cita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default NewAppointment;

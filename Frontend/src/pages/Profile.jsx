import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: 'Diana Castaño',
    numeroIdentificacion: '123456789',
    fechaNacimiento: '1990-05-20',
    numeroCelular: '3101234567',
    correoElectronico: 'diana.zap@email.com',
    contrasena: '',
    confirmarContrasena: '',
    alergiasMedicamentos: true,
    nombreMedicamento: 'Penicilina',
    seguridadSocial: 'Salud Total'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Datos guardados:', formData);
    alert('Cambios guardados exitosamente');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Perfil de usuario
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Número de identificación
              </label>
              <input
                type="text"
                name="numeroIdentificacion"
                value={formData.numeroIdentificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Número de celular
              </label>
              <input
                type="tel"
                name="numeroCelular"
                value={formData.numeroCelular}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="correoElectronico"
                value={formData.correoElectronico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder="........"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                placeholder="........"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="alergiasMedicamentos"
                checked={formData.alergiasMedicamentos}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-gray-900 font-bold">
                ¿Alergia a medicamentos?
              </label>
            </div>

            {formData.alergiasMedicamentos && (
              <div>
                <label className="block text-gray-900 font-bold mb-2">
                  Nombre del medicamento
                </label>
                <input
                  type="text"
                  name="nombreMedicamento"
                  value={formData.nombreMedicamento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-900 font-bold mb-2">
                Seguridad social (EPS)
              </label>
              <input
                type="text"
                name="seguridadSocial"
                value={formData.seguridadSocial}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
const Payments = () => {
const payments = [
    {
      id: 1,
      fecha: "Abril 20",
      cantidad: "$150.000",
      modoPago: "Tarjeta débito",
      estado: "Pagado"
    },
    {
      id: 2,
      fecha: "Marzo 15",
      cantidad: "$200.000",
      modoPago: "Efectivo",
      estado: "Pagado"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Historial de pago
          </h1>

          <div className="space-y-6">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="mb-4">
                  <p className="text-gray-900 mb-2">
                    <span className="font-bold">Fecha:</span> {payment.fecha}
                  </p>
                  <p className="text-gray-900 mb-2">
                    <span className="font-bold">Cantidad:</span> {payment.cantidad}
                  </p>
                  <p className="text-gray-900 mb-2">
                    <span className="font-bold">Modo de pago:</span> {payment.modoPago}
                  </p>
                  <p className="text-gray-900">
                    <span className="font-bold">Estado:</span> {payment.estado}
                  </p>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Descargar factura
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
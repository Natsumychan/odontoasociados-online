const Footer = () => {
  return (
    <footer className="bg-[#0b1728] text-gray-300 py-10 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span>🦷</span> Odontólogos Asociados
          </h3>
          <p className="text-base mt-2">
            Cuidado dental profesional con tecnología de vanguardia para toda la familia.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Enlaces rápidos</h4>
          <ul className="space-y-1 text-base">
            <li><a href="#" className="hover:text-white">Inicio</a></li>
            <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
            <li><a href="#" className="hover:text-white">Servicios</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Servicios</h4>
          <ul className="space-y-1 text-base">
            <li>Revisiones regulares</li>
            <li>Limpieza dental</li>
            <li>Ortodoncia</li>
            <li>Odontología cosmética</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Contacto</h4>
          <ul className="space-y-1 text-base">
            <li>Av. Principal 123, Ciudad</li>
            <li>+1 (555) 123-4567</li>
            <li>contacto@dentalcarepro.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-base text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © 2025 OdontoAsociados. Todos los derechos reservados. |
        <a href="#" className="hover:text-white ml-1">Política de privacidad</a> |
        <a href="#" className="hover:text-white ml-1">Términos de servicio</a>
      </div>
    </footer>
  );
};

export default Footer;

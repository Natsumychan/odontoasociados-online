import { Link } from "react-router-dom";
import "../styles/header-styles.css";
import toothLogo from "../assets/logo/tooth-icon.svg"

const Header = () => {

  return (
    <header className="bg-white shadow-sm flex justify-between items-center w-full px-8 py-4">
      <div className="flex items-center space-x-4 w-1/2">
        <Link to="/" className="flex gap-1">
            <h1  className="logo-title">
              Odontólogos Asociados
            </h1>
            <img src={toothLogo} alt="Logo" className="w-8 h-8" />
        </Link>
      </div>

      <div className="space-x-3">
        <Link  to="/iniciar-sesion">
          <button className="px-4 py-2 rounded-full bg-[#00439C] text-white hover:bg-[#00347a] transition">
            Iniciar sesión
          </button>
        </Link>
        <Link to="/registro">
          <button className="px-4 py-2 rounded-full bg-[#67A5CF] text-white hover:bg-[#4a90c2] transition">
            Registrarse
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

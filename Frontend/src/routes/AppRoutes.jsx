import { BrowserRouter as Router} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ScrollToTop } from "../components";
import AnimatedRoutes from "./AnimatedRoutes";



const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Fuerza el scroll al inicio de la página automáticamente cada vez que cambias de URL. */}
      <AuthProvider>
        <AnimatedRoutes /> {/* Componenete con rutas con animacion para una fácil transición */}
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;

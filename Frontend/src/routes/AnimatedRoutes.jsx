import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AnimatePresence } from "framer-motion";
import { PageTransition, ScrollToLogin } from "../components";

// Layouts o maquetación de las páginas
import { MainLayout, DashboardLayout } from "../layouts";

// Páginas
import {
  Appointments,
  HomePage,
  MedicalHistory,
  Payments,
  Profile,
  Register,
  UserPanel,
  PasswordRecovery,
  ResetPassword,
  NewAppointment
} from "../pages";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🔹 RUTAS PÚBLICAS */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/registro" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/iniciar-sesion" element={<PageTransition><ScrollToLogin /></PageTransition>} />
          <Route path="/recuperar-clave" element={<PageTransition><PasswordRecovery /></PageTransition>} />
          <Route path="/restablecer-clave" element={<PageTransition><ResetPassword /></PageTransition>} />
        </Route>

        {/* 🔒 RUTAS PROTEGIDAS */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/panelUsuario" element={<PageTransition><UserPanel /></PageTransition>} />
          <Route path="/citas" element={<PageTransition><Appointments /></PageTransition>} />
          <Route path="/historial" element={<PageTransition><MedicalHistory /></PageTransition>} />
          <Route path="/pagos" element={<PageTransition><Payments /></PageTransition>} />
          <Route path="/perfil" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/nueva-cita" element={<PageTransition><NewAppointment /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

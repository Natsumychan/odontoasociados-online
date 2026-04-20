import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AnimatePresence } from "framer-motion";
import { PageTransition, ScrollToLogin } from "../components";

// Layouts o maquetación de las páginas
import { MainLayout, DashboardLayout, DashboardLayoutAdmin } from "../layouts";

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
  NewAppointment,
  AdminDashboard,
  CrearOdontologo,
  CrearRecepcionista,
  EditarUsuario,
  ListarUsuarios,
  LoginAdmin,
  TeamsPanel
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
        <Route element={<DashboardLayoutAdmin/>}>
          <Route path="/admin-inicio" element={<PageTransition><LoginAdmin /></PageTransition>} />
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
          <Route path="/dashboardEquipoDeTrabajo" element={<PageTransition><TeamsPanel /></PageTransition>} />
        </Route>
        <Route element={<PrivateRoute>
              <DashboardLayoutAdmin/>
            </PrivateRoute>}>
          <Route path="/adminDashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

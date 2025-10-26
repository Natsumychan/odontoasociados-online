import { Header, Footer } from "../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Encabezado */}
      <Header />

      {/* Contenido principal */}
      <main className="">
        <Outlet />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default MainLayout;

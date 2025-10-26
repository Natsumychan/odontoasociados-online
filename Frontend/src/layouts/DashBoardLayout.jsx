import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar, Sidebar } from "../components";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* 🔹 Topbar fijo arriba */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* 🔹 Sidebar fijo (solo visible en panel) */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md z-10 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64`}
      >
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* 🔹 Contenido principal */}
      <main
        className={`flex-1 mt-16 p-6 transition-all duration-300
          ${sidebarOpen ? "md:ml-64" : "md:ml-64"}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

import { useState } from "react";
import CrearPaciente from "./CrearPaciente";
import CrearOdontologo from "./CrearOdontologo";
import CrearRecepcionista from "./CrearRecepcionista";
import ListaUsuarios from "./ListaUsuarios";

export default function AdminDashboard() {
  const [vista, setVista] = useState("usuarios");

  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: "250px", background: "#00439C", color: "white", padding: "20px" }}>
        <h2>Admin</h2>
        <button onClick={() => setVista("usuarios")}>Usuarios</button>
        <button onClick={() => setVista("paciente")}>Crear Paciente</button>
        <button onClick={() => setVista("odontologo")}>Crear Odontólogo</button>
        <button onClick={() => setVista("recepcionista")}>Crear Recepcionista</button>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, padding: "20px" }}>
        {vista === "usuarios" && <ListaUsuarios />}
        {vista === "paciente" && <CrearPaciente />}
        {vista === "odontologo" && <CrearOdontologo />}
        {vista === "recepcionista" && <CrearRecepcionista />}
      </div>
    </div>
  );
}
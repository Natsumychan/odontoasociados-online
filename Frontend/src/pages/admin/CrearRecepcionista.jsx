import { useState } from "react";
import { crearRecepcionista } from "../../services/administradorService";

export default function CrearRecepcionista() {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    documento: "",
    telefono: "",
    password: "",
    turno: "manana",
    oficina: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      usuario: {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        documento: form.documento,
        telefono: form.telefono,
        password: form.password,
        rol: "recepcionista"
      },
      recepcionista: {
        turno: form.turno,
        oficina: form.oficina
      }
    };

    try {
      await crearRecepcionista(data);
      alert("Recepcionista creado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al crear");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Recepcionista</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="documento" placeholder="Documento" onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />

      <select name="turno" onChange={handleChange}>
        <option value="manana">Mañana</option>
        <option value="tarde">Tarde</option>
      </select>

      <input name="oficina" placeholder="Oficina" onChange={handleChange} />

      <button type="submit">Crear</button>
    </form>
  );
}
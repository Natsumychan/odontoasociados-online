import { useState } from "react";
import { crearOdontologoConUsuario } from "../../services/odontologoService";

export default function CrearOdontologo() {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento:"",
    email: "",
    telefono: "",
    password: "",
    especialidad: "",
    numeroLicencia: "",
    trayectoriaProfesional: ""
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
        documento: form.documento,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
        rol: "odontologo"
      },
      odontologo: {
        especialidad: form.especialidad,
        numeroLicencia: form.numeroLicencia,
        trayectoriaProfesional: parseInt(form.trayectoriaProfesional)
      }
    };

    try {
      await crearOdontologoConUsuario(data);
      alert("Odontólogo creado correctamente");

      // limpiar formulario
      setForm({
        nombre: "",
        apellido: "",
        documento:"",
        email: "",
        telefono: "",
        password: "",
        especialidad: "",
        numeroLicencia: "",
        trayectoriaProfesional: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error al crear odontólogo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Odontólogo</h2>

      <h3>Datos de Usuario</h3>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
      	{/* Cédula */}
					<div>
						<label className='block font-medium'>Cédula *</label>
						<input
							type='text'
							name='documento'
							value={form.documento}
							onChange={handleChange}
							className='w-full border p-2 rounded'
						/>
					</div>
      <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />

      <h3>Datos del Odontólogo</h3>
      <input name="especialidad" placeholder="Especialidad" value={form.especialidad} onChange={handleChange} />
      <input name="numeroLicencia" placeholder="Número de licencia" value={form.numeroLicencia} onChange={handleChange} />
      <input
        name="trayectoriaProfesional"
        type="number"
        placeholder="Años de experiencia"
        value={form.trayectoriaProfesional}
        onChange={handleChange}
      />

      <button type="submit">Crear Odontólogo</button>
    </form>
  );
}
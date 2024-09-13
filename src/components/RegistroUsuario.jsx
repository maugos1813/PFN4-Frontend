import React, { useState } from "react";
import { createUser } from "../services/usuariosServices.jsx";
import gray from "/gray.jpeg";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    tipoUsuario: "residente", 
  });

  const [mensaje, setMensaje] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(formData);
      setMensaje("Usuario creado exitosamente ¿Quieres crear otro?"); 
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        tipoUsuario: "residente", 
      });
    } catch (error) {
      setMensaje("Error al crear el usuario, intente de nuevo");
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-950 flex bg-cover bg-center h-[90vh] justify-center items-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
      <div className="flex flex-col gap-4 border-[2px] border-green-700 rounded-3xl h-[75vh] w-[60vw] items-center bg-black bg-opacity-50">
        <h1 className="text-gray-200 text-[50px] font-extrabold mt-[30px]">
          Registra a un usuario nuevo:
        </h1>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-[50vw] h-[8vh] rounded-xl px-2"
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="w-[50vw] h-[8vh] rounded-xl px-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-[50vw] h-[8vh] rounded-xl px-2"
        />
        <input
          type="password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-[50vw] h-[8vh] rounded-xl px-2"
        />

        
        <select
          name="tipoUsuario"
          value={formData.tipoUsuario}
          onChange={handleChange}
          className="w-[50vw] h-[8vh] rounded-xl px-2 bg-gray-200"
        >
          <option value="residente">Residente</option>
          <option value="administrador">Administrador</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 w-[20vw] h-[6vh] rounded-2xl"
        >
          Crear Usuario
        </button>

        {mensaje && (
          <p className="text-blue-500 text-[20px] mt-4 bg-gray-800 rounded-2xl">
            {mensaje}
          </p>
        )}
      </div>
    </form>
  );
};

export default RegistroUsuario;

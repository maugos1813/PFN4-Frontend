import React, { useState } from "react";
import { crearIncidencia } from "../services/incidenciasServices";
import gray from '/gray.jpeg';

export const Crear = () => {
  const [incidencia, setIncidencia] = useState({
    asunto: "",
    tipo_incidencia: "",
    descripcion: "",
    ubicacion: "",
  });
  const [imagen, setImagen] = useState(null); // Para manejar la imagen

  const handleChange = (e) => {
    setIncidencia({
      ...incidencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Guardar la imagen seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('asunto', incidencia.asunto);
    formData.append('tipo_incidencia', incidencia.tipo_incidencia);
    formData.append('descripcion', incidencia.descripcion);
    formData.append('ubicacion', incidencia.ubicacion);
    if (imagen) {
      formData.append('imagen', imagen); // Agregar imagen si está presente
    }

    try {
      await crearIncidencia(formData);
      alert("Incidencia creada con éxito");
      setIncidencia({
        asunto: "",
        tipo_incidencia: "",
        descripcion: "",
        ubicacion: "",
      });
      setImagen(null); // Limpiar la imagen después del envío
    } catch (error) {
      console.error("Error al crear la incidencia", error);
      alert("Hubo un error al crear la incidencia");
    }
  };

  return (
    <div className="bg-gray-800 h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${gray})` }}>
      <h2 className="text-gray-200 font-bold text-[50px] text-center uppercase">Crear Incidencia</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          name="asunto"
          placeholder="¿Qué es lo que ha pasado?(Título de Descripción)"
          value={incidencia.asunto}
          onChange={handleChange}
          required
          className="h-[10vh] w-[60vw] px-5 rounded-xl"
        />
        <input
          type="text"
          name="tipo_incidencia"
          placeholder="Tipo de Incidencia, Ejemplo: Fontanería"
          value={incidencia.tipo_incidencia}
          onChange={handleChange}
          required
          className="h-[10vh] w-[60vw] px-5 rounded-xl"
        />
        <textarea
          name="descripcion"
          placeholder="Escribe una descripción de lo sucedido"
          value={incidencia.descripcion}
          onChange={handleChange}
          required
          className="h-[15vh] w-[60vw] px-5 rounded-xl"
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación: Lugar - N° Piso"
          value={incidencia.ubicacion}
          onChange={handleChange}
          required
          className="h-[10vh] w-[60vw] px-5 rounded-xl"
        />
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleImageChange}
          className="h-[4vh] w-[30vw] text-white border bg-black"
        />
        <button type="submit" className="bg-green-600 rounded-2xl text-gray-800 w-[300px] h-[10vh]">Crear Incidencia</button>
      </form>
    </div>
  );
};

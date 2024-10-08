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

  const handleChange = (e) => {
    setIncidencia({
      ...incidencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setIncidencia({
      ...incidencia,
      tipo_incidencia: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearIncidencia(incidencia);
      alert("Incidencia creada con éxito");
      setIncidencia({
        asunto: "",
        tipo_incidencia: "",
        descripcion: "",
        ubicacion: "",
      });
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
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="tipo_incidencia"
            placeholder="Tipo de Incidencia, Ejemplo: Fontanería"
            value={incidencia.tipo_incidencia}
            onChange={handleChange}
            required
            className="h-[10vh] w-[40vw] px-5 rounded-xl"
          />
          <select
            name="tipo_incidencia_select"
            onChange={handleSelectChange}
            className="h-[10vh] px-2 rounded-xl"
          >
            <option value="">Selecciona un tipo de incidencia</option>
            <option value="Fontanería">Fontanería</option>
            <option value="Electricidad">Electricidad</option>
            <option value="Calefacción y Aire Acondicionado">Calefacción y Aire Acondicionado</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Estructura y Construcción">Estructura y Construcción</option>
            <option value="Plagas y Pestes">Plagas y Pestes</option>
            <option value="Servicios Generales">Servicios Generales</option>
            <option value="Mobiliario y Equipos">Mobiliario y Equipos</option>
          </select>
        </div>
        <textarea
          name="descripcion"
          placeholder="Escribe una descripción de lo sucedido"
          value={incidencia.descripcion}
          onChange={handleChange}
          required
          className="h-[25vh] w-[60vw] px-5 rounded-xl"
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
        <button type="submit" className="bg-green-600 rounded-2xl text-gray-800 w-[300px] h-[10vh]">Crear Incidencia</button>
      </form>
    </div>
  );
};

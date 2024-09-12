import axios from "axios";

const API_URL = "http://localhost:3000/api/incidencias";

export const obtenerIncidencias = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las incidencias", error);
    throw error;
  }
};

export const obtenerIncidenciaPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la incidencia con ID ${id}`, error);
    throw error;
  }
};

export const crearIncidencia = async (incidencia) => {
  try {
    const response = await axios.post(API_URL, incidencia);
    return response.data;
  } catch (error) {
    console.error("Error al crear la incidencia:", error);
    throw error;
  }
};

export const actualizarIncidencia = async (id, incidenciaActualizada) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, incidenciaActualizada);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la incidencia con ID ${id}`, error);
    throw error;
  }
};

export const eliminarIncidencia = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la incidencia con ID ${id}`, error);
    throw error;
  }
};

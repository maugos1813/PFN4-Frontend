import axios from "axios";

const API_URL = "http://localhost:3000/api/comentarios";

export const obtenerComentarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los comentarios", error);
    throw error;
  }
};

export const crearComentario = async (nuevoComentario) => {
  try {
    const response = await axios.post(API_URL, nuevoComentario);
    return response.data;
  } catch (error) {
    console.error("Error al crear el comentario", error);
    throw error;
  }
};

export const eliminarComentario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el comentario con ID ${id}`, error);
    throw error;
  }
};

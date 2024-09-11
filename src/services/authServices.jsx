import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; 

const login = async (email, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, contraseña });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.response?.data?.message || error.message);
    throw error;
  }
};

const getMe = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) throw new Error('No hay token disponible');

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error.response?.data?.message || error.message);
    throw error;
  }
};

export { login, getMe };
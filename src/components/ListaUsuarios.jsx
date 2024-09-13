import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/usuariosServices.jsx";
import gray from "/gray.jpeg";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data);
        setFilteredUsuarios(data);
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = usuarios;

    if (searchTerm !== "") {
      filtered = filtered.filter(usuario =>
        `${usuario.nombre} ${usuario.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${usuario.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${usuario.nombre}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${usuario.tipoUsuario}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${usuario.id_usuario}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "") {
      filtered = filtered.filter(usuario => usuario.tipoUsuario === selectedType);
    }

    setFilteredUsuarios(filtered);
  }, [searchTerm, selectedType, usuarios]);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(Array.from(selectedUsers).map(userId => deleteUser(userId)));
      
      const data = await getUsers();
      setUsuarios(data);
      setFilteredUsuarios(data);
      setSelectedUsers(new Set());
    } catch (err) {
      setError("Error al eliminar usuarios");
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="bg-cover bg-center h-[90vh] flex flex-col items-start p-4"
      style={{ backgroundImage: `url(${gray})` }}
    >
      <div className="flex items-center mb-4 w-full justify-between">
        <h1 className="font-bold text-green-600 underline text-[50px] flex-grow">
          Lista de Usuarios:
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, apellido, ID o tipo de usuario..."
            className="mt-2 h-[5vh] w-[25vw] rounded-xl px-2 border border-gray-300"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-2 h-[5vh] w-[20vw] rounded-xl px-2 border border-gray-300"
          >
            <option value="">Ver Todos</option>
            <option value="administrador">Administradores</option>
            <option value="residente">Residentes</option>
          </select>
          <button
            onClick={handleDeleteSelected}
            className={`mt-2 h-[5vh] px-4 rounded-xl ${
              selectedUsers.size > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
            } text-white`}
            disabled={selectedUsers.size === 0}
          >
            Eliminar Seleccionados
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-3 w-full ml-[4%]">
        {filteredUsuarios.map((usuario, index) => (
          <li
            key={usuario.id || index}
            className="bg-white h-[5vh] w-[90vw] rounded-xl flex gap-5 px-5 items-center"
          >
            <div className="flex flex-grow gap-5">
              <div className="flex gap-5 items-center">
                <input
                  type="checkbox"
                  checked={selectedUsers.has(usuario.id_usuario)}
                  onChange={() => handleSelectUser(usuario.id_usuario)}
                />
                <h1 className="uppercase font-semibold text-green-600">Id Usuario:</h1>
                {usuario.id_usuario}
              </div>
              <div className="flex gap-5">
                <h1 className="uppercase font-semibold text-green-600">Nombre de usuario:</h1>
                {usuario.nombre} {usuario.apellido}
              </div>
              <div className="flex gap-5">
                <h1 className="uppercase font-semibold text-green-600">Email:</h1>
                {usuario.email}
              </div>
              <div className="flex gap-5">
                <h1 className="uppercase font-semibold text-green-600">Tipo de Usuario:</h1>
                {usuario.tipoUsuario}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;

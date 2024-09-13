import React, { useContext, useState } from "react";
import { ListaIncidenciasContext } from "../contexts/IncidenciasContext";
import { useLogin } from "../contexts/LoginContext";
import gray from "/gray.jpeg";
import Modal from "./Modal";
import { eliminarIncidencia } from "../services/incidenciasServices.jsx";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Terminado = () => {
  const { data, refetch } = useContext(ListaIncidenciasContext);
  const { user } = useLogin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncidencias, setSelectedIncidencias] = useState([]);
  const [selectedIncidencia, setSelectedIncidencia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredIncidencias = data.filter(
    (m) =>
      m.estado.toLowerCase() === "resuelta" &&
      (m.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.tipo_incidencia.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCheckboxChange = (id) => {
    setSelectedIncidencias((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleEliminarClick = async () => {
    try {
      for (const id of selectedIncidencias) {
        await eliminarIncidencia(id);
      }
      refetch();
      setSelectedIncidencias([]);
    } catch (error) {
      console.error("Error al eliminar incidencias", error);
    }
  };

  const handleIncidenciaClick = (incidencia) => {
    setSelectedIncidencia(incidencia);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIncidencia(null);
  };

  const isButtonDisabled = selectedIncidencias.length === 0;

  return (
    <div
      className="flex flex-col gap-4 bg-gray-700 h-[90vh] pl-[1%] pt-[1%] bg-cover bg-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
      <div className="flex gap-4 uppercase justify-end">
        <h1 className="text-green-500 font-extrabold text-[30px] underline">
          Buscar incidencias:
        </h1>
        <input
          type="text"
          placeholder="Buscar incidencias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 rounded-md w-[30vw] mr-4"
        />
        {user?.tipoUsuario === "administrador" && (
          <button
            onClick={handleEliminarClick}
            className={`p-2 mr-3 rounded-md h-[5vh] ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
            disabled={isButtonDisabled}
          >
            Eliminar Seleccionados
          </button>
        )}
      </div>

      {filteredIncidencias.length > 0 ? (
        filteredIncidencias.map((m) => (
          <div
            key={m.idIncidencia}
            className="h-[10vh] w-[98vw] shadow-2xl2xl flex items-center rounded-3xl px-4 bg-white hover:bg-gray-300 gap-2 overflow-hidden cursor-pointer"
          >
            <div className="flex flex-wrap items-center w-full">
              {user?.tipoUsuario === "administrador" && (
                <input
                  type="checkbox"
                  checked={selectedIncidencias.includes(m.idIncidencia)}
                  onChange={() => handleCheckboxChange(m.idIncidencia)}
                  className="mx-5"
                />
              )}
              <div className="flex flex-col">
                <h1 className="uppercase font-semibold text-green-600 w-[30%]">
                  Asunto:
                </h1>
                <p className="px-1 truncate">{truncateText(m.asunto, 20)}</p>
              </div>
            </div>

            <div className="flex flex-col items-start w-full gap-1">
              <h1 className="uppercase font-semibold text-green-600 w-[30%]">
                Descripción:
              </h1>
              <p className="px-1 truncate">{truncateText(m.descripcion, 20)}</p>
            </div>

            <div className="flex flex-col items-start w-full">
              <h1 className="uppercase font-semibold text-green-600 w-[100%]">
                Fecha de creación:
              </h1>
              <p className="px-1 truncate">
                {truncateText(m.fecha_reporte, 20)}
              </p>
            </div>

            <div className="flex flex-col items-start w-full">
              <h1 className="uppercase font-semibold text-green-600 w-[80%]">
                Tipo de Incidencia:
              </h1>
              <p className="px-1 truncate">
                {truncateText(m.tipo_incidencia, 20)}
              </p>
            </div>

            <div className="flex flex-col items-start w-full">
              <h1 className="uppercase font-semibold text-green-600 w-[30%]">
                Estado:
              </h1>
              <p className="px-1 truncate">{truncateText(m.estado, 20)}</p>
            </div>

            <button
              onClick={() => handleIncidenciaClick(m)}
              className="bg-green-600 text-white p-2 rounded-md ml-4 hover:bg-green-500"
            >
              Ver detalles
            </button>
          </div>
        ))
      ) : (
        <p className="text-green-700 text-[50px] bg-gray-900 w-[90vw] text-center ml-[5%]">
          No hay incidencias resueltas.
        </p>
      )}

      {isModalOpen && (
        <Modal incidencia={selectedIncidencia} onClose={closeModal} />
      )}
    </div>
  );
};

export default Terminado;

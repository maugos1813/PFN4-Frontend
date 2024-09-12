import React from "react";
import { Link } from "wouter";
import gray from "/gray.jpeg";
import { useLogin } from "../contexts/LoginContext";

const Home = () => {
  const { user } = useLogin();

  return (
    <div
      className="bg-gray-800 h-[90vh] bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
    
      <h1 className="text-gray-200 font-bold text-[60px] w-[80vw] h-[30vh] uppercase ml-10 text-center">
        {user?.tipoUsuario === 'administrador'
          ? "¿Listo(a) para resolver problemas a lo grande?"
          : "¿Listo(a) para anotar y/o informar una incidencia hoy?"}
      </h1>

      <div>
        
        {user?.tipoUsuario === 'administrador' ? (
          <>
            <Link to="/verincidencias">
              <button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10">
                Empieza ahora
              </button>
            </Link>
            <Link to="/terminado">
              <button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10">
                Termina y Elimina
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/crear">
              <button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10">
                Empieza ahora
              </button>
            </Link>
            <Link to="/verincidencias">
              <button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10">
                Tu lista de incidencias
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

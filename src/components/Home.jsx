import React from "react";
import gray from "/gray.jpeg";
import { Link } from "wouter";

export const Home = () => {
  return (
    <div
      className="bg-gray-800 h-[90vh] bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
     <h1 className="text-gray-200 font-bold text-[60px] w-[80vw] h-[30vh] uppercase ml-10 text-center">¿Listo para anotar y/o informar una incidencia hoy?</h1>
      <div>
      <Link to="/crear"><button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10"> Empieza ahora</button></Link>
      <Link to="/verincidencias"><button className="bg-green-500 w-[20vw] h-[12vh] rounded-xl mt-[5%] ml-10">Tu lista de incidencias</button></Link>
      </div>
     
    </div>
  );
};

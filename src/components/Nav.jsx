import React, { useState, useEffect } from 'react';
import { Link, Route } from "wouter";
import { useLogin } from "../contexts/LoginContext";
import pcalert from "/pcalert.png";
import logout from "../assets/logout.png";
import Home from "./Home";
import { Crear } from "./Crear";
import { VerIncidencias } from "./VerIncidencias";
import Terminado from "./Terminado";

export const Nav = () => {
  const { user, logout: logoutFunction } = useLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    if (user) {
      setIsLoading(false);
    } else {
     
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    logoutFunction();
  };

  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div>
      <nav>
        <ul className="flex justify-end items-center gap-10 px-10 h-[10vh] bg-green-500 font-semibold text-gray-800">
          <div>
            <img
              src={pcalert}
              alt="pc alert icon"
              className="w-[10vh] absolute left-5 top-0"
            />
          </div>
          <li>
            <Link href="/home" className="active:text-white">Home</Link>
          </li>

         
          {user?.tipoUsuario === 'residente' && (
            <li>
              <Link href="/crear" className="active:text-white">Crear</Link>
            </li>
          )}

          <li>
            <Link href="/verincidencias" className="active:text-white">Ver Incidencias</Link>
          </li>

       
          {user?.tipoUsuario === 'administrador' && (
            <li>
              <Link href="/terminado" className="active:text-white">Terminado</Link>
            </li>
          )}

          <li>
            <img
              src={logout}
              alt="logout icon"
              className="hover:cursor-pointer"
              onClick={handleLogout}
            />
          </li>
        </ul>
      </nav>
      
     
      <Route path="/home"><Home /></Route>
      {user?.tipoUsuario === 'residente' && <Route path="/crear"><Crear /></Route>}
      <Route path="/verincidencias"><VerIncidencias /></Route>
      {user?.tipoUsuario === 'administrador' && <Route path="/terminado"><Terminado /></Route>}
    </div>
  );
};

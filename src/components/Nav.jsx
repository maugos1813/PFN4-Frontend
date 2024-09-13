import React, { useState, useEffect } from 'react';
import { Link, Route } from "wouter";
import { useLogin } from "../contexts/LoginContext";
import pcalert from "/pcalert.png";
import logout from "../assets/logout.png";
import Home from "./Home";
import { Crear } from "./Crear";
import { VerIncidencias } from "./VerIncidencias";
import Terminado from "./Terminado";
import RegistroUsuario from './RegistroUsuario';
import ListaUsuarios from './ListaUsuarios'; // Importa el componente ListaUsuarios

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
            <>
              <li>
                <Link href="/terminado" className="active:text-white">Terminado</Link>
              </li>
              <li>
                <Link href="/registrousuario" className="active:text-white">Registro Usuario</Link>
              </li>
              <li>
                <Link href="/listausuarios" className="active:text-white">Lista Usuarios</Link> {/* Enlace para ListaUsuarios */}
              </li>
            </>
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
      {user?.tipoUsuario === 'administrador' && <Route path="/registrousuario"><RegistroUsuario /></Route>}
      {user?.tipoUsuario === 'administrador' && <Route path="/listausuarios"><ListaUsuarios /></Route>} {/* Ruta para ListaUsuarios */}
    </div>
  );
};

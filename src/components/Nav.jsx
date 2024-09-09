import React from "react";
import { Home } from "./Home";
import { Crear } from "./Crear";
import { Incidencias } from "./Incidencias";
import { VerIncidencias } from "./VerIncidencias";
import { Link, Route } from "wouter";
import pcalert from "/pcalert.png";

export const Nav = () => {
  return (
    <div>
      <nav className="">
        <ul className="flex justify-end items-center gap-10 px-10 h-[10vh] bg-green-500 font-semibold text-gray-800">
          <div>
            <img
              src={pcalert}
              alt="pc alert icon"
              className="w-[10vh] absolute left-5 top-0"
            />
          </div>
          <li>
            <Link href="/" className=" active:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/crear" className=" active:text-white">
              Crear
            </Link>
          </li>
          {/* <li>
            <Link href="/incidencias" className=" active:text-white">
              Incidencias
            </Link>
          </li> */}
          <li>
            <Link href="/verincidencias" className=" active:text-white">
              Ver Incidencias
            </Link>
          </li>
        </ul>
      </nav>

      <Route path="/" component={Home} />
      <Route path="/crear" component={Crear} />
      <Route path="/incidencias" component={Incidencias} />
      <Route path="/verincidencias" component={VerIncidencias} />
    </div>
  );
};

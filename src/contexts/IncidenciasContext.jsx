import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { obtenerIncidencias } from "../services/incidenciasServices.jsx";

export const ListaIncidenciasContext = createContext();

export const ListaInciden = ({ children }) => {
  const { data, refetch } = useQuery({
    queryKey: ['incidencias'],
    queryFn: obtenerIncidencias
  });

  return (
    <ListaIncidenciasContext.Provider value={{ data, refetch }}>
      {children}
    </ListaIncidenciasContext.Provider>
  );
};
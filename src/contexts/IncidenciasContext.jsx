import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { obtenerIncidencias } from "../services/incidenciasServices.jsx";

export const ListaIncidenciasContext = createContext()

export const ListaInciden = ({ children }) => {
    const { data } = useQuery({
        queryKey: ['incidencias'],
        queryFn: obtenerIncidencias
    })

    console.log("Data", data);

    return (
        <ListaIncidenciasContext.Provider value={{data}}>
            {children}
        </ListaIncidenciasContext.Provider>
    )
}
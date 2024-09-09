// import React, { useContext } from "react";
// import { ListaIncidenciasContext } from "../contexts/IncidenciasContext";
// import gray from "/gray.jpeg";

// export const VerIncidencias = () => {
//   const { data } = useContext(ListaIncidenciasContext);
//   console.log(data);

//   return (
//     <div
//       className="flex flex-col gap-4 bg-gray-700 h-[90vh] pl-[1%] pt-[1%] bg-cover bg-center"
//       style={{ backgroundImage: `url(${gray})` }}
//     >
//       {data &&
//         data.map((m) => (
//           <div key={m.idIncidencia} className="h-[10vh] w-[98vw] shadow-2xl2xl flex items-center rounded-3xl px-4 bg-white hover:bg-gray-300 gap-2">
//             <div className="flex">
//               <h1
//                 key={m.idIncidencia}
//                 className="uppercase font-semibold text-gray-800"
//               >
//                 Asunto:
//               </h1>
//               <p className="px-1">{m && m.asunto}</p>
//             </div>

//             <div className="flex">
//               <h1 className="uppercase font-semibold">Descripcion:</h1>
//               <p className="px-1">{m && m.descripcion}</p>
              
//             </div>
//             <div className="flex">
//               <h1 className="uppercase font-semibold">Fecha de creación:</h1>
//               <p className="px-1">{m && m.fecha_reporte}</p>
//             </div>
//             <div className="flex">
//               <h1 className="uppercase font-semibold">Tipo de Incidencia:</h1>
//               <p className="px-1">{m && m.tipo_incidencia}</p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

import React, { useContext, useState } from "react";
import { ListaIncidenciasContext } from "../contexts/IncidenciasContext";
import gray from "/gray.jpeg";

export const VerIncidencias = () => {
  const { data } = useContext(ListaIncidenciasContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIncidencias = data.filter(
    (m) =>
      m.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.tipo_incidencia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex flex-col gap-4 bg-gray-700 h-[90vh] pl-[1%] pt-[1%] bg-cover bg-center"
      style={{ backgroundImage: `url(${gray})` }}
    >
      
      <input
        type="text"
        placeholder="Buscar incidencias..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 rounded-md"
      />

      {/* Mostrar incidencias filtradas */}
      {filteredIncidencias &&
        filteredIncidencias.map((m) => (
          <div
            key={m.idIncidencia}
            className="h-[10vh] w-[98vw] shadow-2xl2xl flex items-center rounded-3xl px-4 bg-white hover:bg-gray-300 gap-2"
          >
            <div className="flex">
              <h1 className="uppercase font-semibold text-gray-800">Asunto:</h1>
              <p className="px-1">{m.asunto}</p>
            </div>

            <div className="flex">
              <h1 className="uppercase font-semibold">Descripcion:</h1>
              <p className="px-1">{m.descripcion}</p>
            </div>

            <div className="flex">
              <h1 className="uppercase font-semibold">
                Fecha de creación:
              </h1>
              <p className="px-1">{m.fecha_reporte}</p>
            </div>

            <div className="flex">
              <h1 className="uppercase font-semibold">
                Tipo de Incidencia:
              </h1>
              <p className="px-1">{m.tipo_incidencia}</p>
            </div>
          </div>
        ))}
    </div>
  );
};


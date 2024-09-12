import React from 'react';

const Modal = ({ incidencia, onClose }) => {
  if (!incidencia) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Detalles de la Incidencia</h2>
        <p><strong>Asunto:</strong> {incidencia.asunto}</p>
        <p><strong>Descripción:</strong> {incidencia.descripcion}</p>
        <p><strong>Fecha de Creación:</strong> {incidencia.fecha_reporte}</p>
        <p><strong>Tipo de Incidencia:</strong> {incidencia.tipo_incidencia}</p>
        <p><strong>Estado:</strong> {incidencia.estado}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white p-2 rounded-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;

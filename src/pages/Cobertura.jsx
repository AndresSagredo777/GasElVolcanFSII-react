// src/pages/Cobertura.jsx
import React from 'react';

function Cobertura() {
  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-3">Cobertura de Despacho</h1>
      <p className="text-muted">
        Llegamos a gran parte de la Región Metropolitana con nuestro servicio de reparto de cilindros.
      </p>
      <ul className="list-group list-group-flush max-w-md">
        <li className="list-group-item">📍 Puente Alto</li>
        <li className="list-group-item">📍 La Florida</li>
        <li className="list-group-item">📍 Pirque</li>
        <li className="list-group-item">📍 San Bernardo</li>
      </ul>
    </div>
  );
}

// Esta es la línea que le faltaba a tu archivo:
export default Cobertura;
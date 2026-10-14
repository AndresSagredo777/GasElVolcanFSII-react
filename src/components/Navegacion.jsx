// src/components/Navegacion.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navegacion() {
  // Estado para controlar el menú hamburguesa en celulares
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="cabecera">
      {/* Marca / Logo con redirección SPA */}
      <Link className="marca" to="/" onClick={cerrarMenu}>
        Gas El Volcan
      </Link>

      {/* Botón menú hamburguesa para versión móvil */}
      <button 
        className={`boton-menu ${menuAbierto ? 'activo' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir o cerrar navegación"
      >
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
      </button>

      {/* Lista de navegación */}
      <nav>
        <ul className={`menu ${menuAbierto ? 'menu-abierto' : ''}`}>
          <li>
            <NavLink to="/" onClick={cerrarMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" onClick={cerrarMenu}>
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/nosotros" onClick={cerrarMenu}>
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/cobertura" onClick={cerrarMenu}>
              Cobertura
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navegacion;
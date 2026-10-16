// src/components/Navegacion.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navegacion({ cantidadTotal = 0, usuarioActual = null, cerrarSesion }) {
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
        aria-expanded={menuAbierto}
        aria-controls="menu-principal"
        type="button"
      >
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
      </button>

      {/* Lista de navegación */}
      <nav>
        <ul id="menu-principal" className={`menu ${menuAbierto ? 'menu-abierto' : ''}`}>
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
          <li><NavLink to="/ofertas" onClick={cerrarMenu}>Ofertas</NavLink></li>
          <li><NavLink to="/blog" onClick={cerrarMenu}>Blog</NavLink></li>
          <li><NavLink to="/contacto" onClick={cerrarMenu}>Contacto</NavLink></li>
          <li><NavLink to="/carrito" onClick={cerrarMenu}>🛒 Carrito ({cantidadTotal})</NavLink></li>
          <li>
            {usuarioActual ? (
              <button className="enlace-menu" type="button" onClick={() => { cerrarSesion?.(); cerrarMenu(); }}>
                👤 {usuarioActual.nombre || usuarioActual.email || 'Usuario'} · Salir
              </button>
            ) : (
              <NavLink to="/login" onClick={cerrarMenu}>🔑 Ingresar</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navegacion;

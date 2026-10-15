import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Cabecera({ cantidadTotal = 0, usuarioActual, cerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="cabecera">
      <Link className="marca" to="/" onClick={cerrarMenu}>
        Gas El Volcan
      </Link>

      <button 
        className={`boton-menu ${menuAbierto ? 'activo' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir o cerrar navegación"
      >
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
        <span className="linea-menu"></span>
      </button>

      <nav>
        <ul className={`menu ${menuAbierto ? 'menu-abierto' : ''}`}>
          <li><NavLink to="/" onClick={cerrarMenu}>Inicio</NavLink></li>
          <li><NavLink to="/productos" onClick={cerrarMenu}>Productos</NavLink></li>
          <li><NavLink to="/ofertas" onClick={cerrarMenu}>Ofertas</NavLink></li>
          <li><NavLink to="/nosotros" onClick={cerrarMenu}>Nosotros</NavLink></li>
          <li><NavLink to="/blog" onClick={cerrarMenu}>Blog</NavLink></li>
          <li><NavLink to="/contacto" onClick={cerrarMenu}>Contacto</NavLink></li>
          <li>
            <NavLink to="/carrito" onClick={cerrarMenu} style={{ fontWeight: 'bold', color: 'var(--color-primario)' }}>
              🛒 Carrito ({cantidadTotal})
            </NavLink>
          </li>
          
          {usuarioActual ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 'bold', color: 'var(--color-secundario)' }}>
                👤 {usuarioActual.nombre.split(' ')[0]}
              </span>
              <button 
                onClick={() => { cerrarSesion(); cerrarMenu(); }}
                style={{
                  background: '#e2e8f0',
                  border: 'none',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Salir
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" onClick={cerrarMenu} style={{ fontWeight: 'bold' }}>
                🔑 Ingresar
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Cabecera;
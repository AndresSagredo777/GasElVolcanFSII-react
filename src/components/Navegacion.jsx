import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { obtenerRolUsuario } from '../utils/usuarios';

function Navegacion({ cantidadTotal = 0, usuarioActual = null, cerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const rol = obtenerRolUsuario(usuarioActual);
  const puedeGestionar = usuarioActual && (rol === 'admin' || rol === 'vendedor');

  return (
    <header className="cabecera">
      <Link className="marca" to="/" onClick={cerrarMenu}>
        Gas El Volcan
      </Link>

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

          {puedeGestionar && (
            <li>
              <NavLink to="/admin" onClick={cerrarMenu}>
                {rol === 'admin' ? '⚙️ Admin' : '📋 Gestión'}
              </NavLink>
            </li>
          )}

          {usuarioActual && (
            <li>
              <NavLink to="/perfil" onClick={cerrarMenu}>
                Mi Perfil
              </NavLink>
            </li>
          )}

          <li>
            {usuarioActual ? (
              <button
                className="enlace-menu"
                type="button"
                onClick={() => {
                  cerrarSesion?.();
                  cerrarMenu();
                }}
              >
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
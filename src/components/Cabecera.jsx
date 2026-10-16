import React from 'react';
import { Link } from 'react-router-dom';

function Cabecera({ cantidadTotal, usuarioActual, cerrarSesion }) {
  return (
    <header className="cabecera" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: '#1e293b', fontSize: '1.4rem', fontWeight: '800' }}>
          Gas El Volcan
        </Link>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Inicio</Link>
        <Link to="/productos" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Productos</Link>
        <Link to="/ofertas" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Ofertas</Link>
        <Link to="/nosotros" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Nosotros</Link>
        <Link to="/cobertura" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Cobertura</Link>
        <Link to="/blog" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Blog</Link>
        <Link to="/contacto" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Contacto</Link>
        
        <Link to="/carrito" style={{ textDecoration: 'none', color: '#e65100', fontWeight: '700' }}>
          🛒 Carrito ({cantidadTotal})
        </Link>

        {usuarioActual ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontWeight: '700', color: '#1e293b' }}>
              👤 {usuarioActual.nombre || usuarioActual.email || 'Usuario'}
            </span>
            <button
              type="button"
              onClick={cerrarSesion}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: '#e2e8f0',
                color: '#1e293b',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#e65100', fontWeight: '700' }}>
            🔑 Ingresar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Cabecera;
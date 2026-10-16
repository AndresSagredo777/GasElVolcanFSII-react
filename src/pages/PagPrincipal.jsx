import React from 'react';
import { Link } from 'react-router-dom';

function PagPrincipal({ productos = [], agregarAlCarrito }) {
  // Tomamos una selección de productos destacados para la portada
  const productosDestacados = productos.slice(0, 4);

  return (
    <div className="contenedor-principal">
      <section className="hero-section" style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '2rem' }}>
        <h1>Bienvenido a Gas El Volcan</h1>
        <p>Distribución rápida y segura de gas licuado y accesorios para tu hogar o negocio.</p>
        <Link to="/productos" className="boton" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.7rem 1.5rem', backgroundColor: '#e65100', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Ver Catálogo Completo
        </Link>
      </section>

      <section className="seccion-destacados">
        <h2 style={{ marginBottom: '1.5rem' }}>Productos Destacados</h2>
        <div className="grid-productos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {productosDestacados.map((prod) => (
            <div key={prod.id} className="tarjeta-producto" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '180px', objectFit: 'contain', marginBottom: '1rem' }} />
                <h3>{prod.nombre}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', minHeight: '40px' }}>{prod.descripcion}</p>
                <p style={{ fontSize: '0.85rem', color: prod.stock > 0 ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
                  {prod.stock > 0 ? `Stock disponible: ${prod.stock} un.` : 'Agotado'}
                </p>
                <h4 style={{ fontSize: '1.3rem', color: '#1a237e', margin: '0.5rem 0' }}>
                  ${prod.precio.toLocaleString('es-CL')}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => agregarAlCarrito(prod)}
                disabled={prod.stock <= 0}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  backgroundColor: prod.stock > 0 ? '#e65100' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: prod.stock > 0 ? 'pointer' : 'not-allowed',
                  marginTop: '1rem'
                }}
              >
                {prod.stock > 0 ? 'Añadir al pedido' : 'Sin Stock'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PagPrincipal;
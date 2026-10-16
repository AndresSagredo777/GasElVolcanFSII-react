import React from 'react';
import { Link } from 'react-router-dom';

function PagPrincipal({ productos = [], agregarAlCarrito }) {
  const productosDestacados = productos.slice(0, 4);

  return (
    <div className="contenedor-principal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Banner Principal / Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        marginBottom: '3rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Bienvenido a Gas El Volcan
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 1.8rem auto', lineHeight: '1.6' }}>
          Distribución rápida y segura de gas licuado y accesorios para tu hogar o negocio.
        </p>
        <Link 
          to="/productos" 
          style={{
            display: 'inline-block',
            backgroundColor: '#e65100',
            color: '#fff',
            padding: '0.85rem 2rem',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(230, 81, 0, 0.25)',
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
        >
          Ver Catálogo Completo
        </Link>
      </section>

      {/* Productos Destacados */}
      <section>
        <h2 style={{ fontSize: '1.8rem', color: '#1e293b', fontWeight: '700', marginBottom: '1.5rem' }}>
          Productos Destacados
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {productosDestacados.map((prod) => (
            <div 
              key={prod.id} 
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <img 
                    src={prod.imagen ? (prod.imagen.startsWith('/') ? prod.imagen : `/${prod.imagen}`) : '/assets/cilindro11kg.png'} 
                    alt={prod.nombre} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/cilindro11kg.png'; }}
                  />
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#1e293b', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {prod.nombre}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.4', minHeight: '42px', marginBottom: '0.8rem' }}>
                  {prod.descripcion}
                </p>
                <p style={{ fontSize: '0.875rem', color: prod.stock > 0 ? '#15803d' : '#b91c1c', fontWeight: '600', marginBottom: '0.8rem' }}>
                  {prod.stock > 0 ? `Stock disponible: ${prod.stock} un.` : 'Agotado'}
                </p>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.2rem' }}>
                  ${prod.precio.toLocaleString('es-CL')}
                </div>
              </div>

              <button
                type="button"
                onClick={() => agregarAlCarrito(prod)}
                disabled={prod.stock <= 0}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: prod.stock > 0 ? '#e65100' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: prod.stock > 0 ? 'pointer' : 'not-allowed',
                  boxShadow: prod.stock > 0 ? '0 4px 10px rgba(230, 81, 0, 0.2)' : 'none'
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
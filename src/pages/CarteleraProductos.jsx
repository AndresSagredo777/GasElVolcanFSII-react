import React, { useState } from 'react';

function CarteleraProductos({ productos = [], agregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = ['Todas', 'Cilindros de Gas', 'Accesorios y Reguladores'];

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="contenedor-principal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Encabezado */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#1e293b', fontWeight: '800', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
          Catálogo de Productos
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Selecciona tus productos y añádelos a tu pedido.
        </p>
      </header>

      {/* Filtros Píldora */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {categorias.map((cat) => {
          const estaActivo = categoriaSeleccionada === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaSeleccionada(cat)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                border: estaActivo ? '2px solid #e65100' : '1px solid #0f172a',
                backgroundColor: estaActivo ? '#e65100' : '#ffffff',
                color: estaActivo ? '#ffffff' : '#0f172a',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: estaActivo ? '0 4px 10px rgba(230, 81, 0, 0.25)' : '0 2px 4px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat === 'Todas' ? 'Todos los productos' : cat}
            </button>
          );
        })}
      </div>

      {/* Grilla de Productos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {productosFiltrados.map((prod) => (
          <div 
            key={prod.id} 
            style={{
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Etiqueta de Oferta */}
            {prod.oferta && (
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: '#f97316',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                boxShadow: '0 2px 6px rgba(249, 115, 22, 0.3)',
                zIndex: 1
              }}>
                🔥 {prod.descuento ? `${prod.descuento}% OFF` : 'En Oferta'}
              </span>
            )}

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

              {/* Precio Oferta / Normal */}
              <div style={{ marginBottom: '1.2rem' }}>
                {prod.precioAnterior && (
                  <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.95rem', marginRight: '8px' }}>
                    ${prod.precioAnterior.toLocaleString('es-CL')}
                  </span>
                )}
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: prod.oferta ? '#e65100' : '#0f172a' }}>
                  ${prod.precio.toLocaleString('es-CL')}
                </span>
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
    </div>
  );
}

export default CarteleraProductos;
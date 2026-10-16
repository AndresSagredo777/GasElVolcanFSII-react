import React, { useState } from 'react';

function CarteleraProductos({ productos = [], agregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = ['Todas', 'Cilindros de Gas', 'Accesorios y Reguladores'];

  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="contenedor-principal">
      <h2>Catálogo de Productos</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>Selecciona tus productos y añádelos a tu pedido.</p>

      {/* Filtros por Categoría */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoriaSeleccionada(cat)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              border: '1px solid #e65100',
              backgroundColor: categoriaSeleccionada === cat ? '#e65100' : '#fff',
              color: categoriaSeleccionada === cat ? '#fff' : '#e65100',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {cat === 'Todas' ? 'Todos los productos' : cat}
          </button>
        ))}
      </div>

      {/* Lista de Tarjetas */}
      <div className="grid-productos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {productosFiltrados.map((prod) => (
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
    </div>
  );
}

export default CarteleraProductos;
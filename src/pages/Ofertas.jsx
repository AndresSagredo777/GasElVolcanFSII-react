import React from 'react';

function Ofertas({ productos = [], agregarAlCarrito }) {
  // Filtrar productos marcados en oferta
  const productosEnOferta = productos.filter((p) => p.oferta === true);

  return (
    <div className="contenedor-principal">
      <div className="banner-ofertas" style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#e65100', color: '#fff', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>🔥 Promociones y Ofertas de la Semana</h2>
        <p>Aprovecha precios rebajados en cilindros seleccionados y kits de conexión.</p>
      </div>

      <div className="grid-productos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {productosEnOferta.map((prod) => (
          <div key={prod.id} className="tarjeta-producto" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', position: 'relative', background: '#fff' }}>
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#ff9800', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              🔥 {prod.descuento ? `${prod.descuento}% OFF` : 'En Oferta'}
            </span>
            
            <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '180px', objectFit: 'contain', margin: '1rem 0' }} />
            
            <h3>{prod.nombre}</h3>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>{prod.descripcion}</p>
            
            <div style={{ margin: '1rem 0' }}>
              {prod.precioAnterior && (
                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '8px', fontSize: '0.9rem' }}>
                  ${prod.precioAnterior.toLocaleString('es-CL')}
                </span>
              )}
              <strong style={{ fontSize: '1.2rem', color: '#2e7d32' }}>
                ${prod.precio.toLocaleString('es-CL')}
              </strong>
            </div>

            <p style={{ fontSize: '0.8rem', color: prod.stock > 0 ? '#2e7d32' : '#c62828', fontWeight: 'bold' }}>
              {prod.stock > 0 ? `Stock disponible: ${prod.stock} un.` : 'Agotado'}
            </p>

            <button
              onClick={() => agregarAlCarrito(prod)}
              disabled={prod.stock <= 0}
              className="boton"
              style={{ width: '100%', padding: '0.6rem', backgroundColor: prod.stock > 0 ? '#e65100' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px', cursor: prod.stock > 0 ? 'pointer' : 'not-allowed' }}
            >
              {prod.stock > 0 ? 'Añadir al pedido' : 'Sin Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ofertas;
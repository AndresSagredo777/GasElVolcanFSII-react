import React from 'react';
import { useParams, Link } from 'react-router-dom';

function DetalleProducto({ productos = [], agregar }) {
  const { id } = useParams();
  const producto = productos.find((p) => Number(p.id) === Number(id));

  if (!producto) {
    return (
      <main className="contenedor-principal text-center py-5">
        <h2>Producto no encontrado</h2>
        <p>El artículo que buscas no existe o fue removido.</p>
        <Link to="/productos" className="boton mt-3">Volver al Catálogo</Link>
      </main>
    );
  }

  const rutaImagen = producto.imagen 
    ? (producto.imagen.startsWith('/') ? producto.imagen : `/${producto.imagen}`) 
    : '/assets/cilindro11kg.png';

  return (
    <main className="contenedor-principal">
      <Link to="/productos" style={{ textDecoration: 'none', color: 'var(--color-primario)', fontWeight: 'bold' }}>
        ← Volver al Catálogo
      </Link>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem', background: '#fff', padding: '2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <div style={{ flex: '1', minWidth: '280px', textAlign: 'center' }}>
          <img src={rutaImagen} alt={producto.nombre} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
        </div>

        <div style={{ flex: '1.5', minWidth: '280px' }}>
          <span className="badge-estado">{producto.categoria}</span>
          <h1 style={{ color: 'var(--color-secundario)', margin: '0.5rem 0' }}>{producto.nombre}</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem' }}>{producto.descripcion}</p>

          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-secundario)', marginBottom: '1rem' }}>
            ${producto.precio.toLocaleString('es-CL')}
          </div>

          <p style={{ color: producto.stock > 0 ? '#276749' : '#e53e3e', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {producto.stock > 0 ? `Stock Disponible: ${producto.stock} unidades` : 'Agotado'}
          </p>

          <button 
            className="boton"
            onClick={() => agregar(producto)}
            disabled={producto.stock === 0}
            style={{ width: '100%', maxWidth: '300px', backgroundColor: producto.stock === 0 ? '#cbd5e1' : undefined }}
          >
            {producto.stock > 0 ? '🛒 Añadir al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
import React from 'react';
import { Link } from 'react-router-dom';

function Ofertas({ productos = [], agregar }) {
  const enOferta = productos.filter((p) => p.oferta === true);

  return (
    <main className="contenedor-principal">
      <section className="hero-home" style={{ background: 'linear-gradient(135deg, #c05621 0%, #e2711d 100%)', marginBottom: '2rem' }}>
        <span className="insignia-hero">🏷️ Descuentos Exclusivos</span>
        <h1>Promociones y Ofertas de la Semana</h1>
        <p className="bajada-hero-home">Aprovecha precios rebajados en cilindros seleccionados y kits de conexión.</p>
      </section>

      <div className="grilla-productos">
        {enOferta.map((prod) => {
          const rutaImagen = prod.imagen 
            ? (prod.imagen.startsWith('/') ? prod.imagen : `/${prod.imagen}`) 
            : '/assets/cilindro11kg.png';

          return (
            <article className="Producto" key={prod.id} style={{ borderTop: '4px solid #e2711d' }}>
              <span className="badge-estado" style={{ backgroundColor: '#feebc8', color: '#c05621', alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                🔥 En Oferta
              </span>
              <img src={rutaImagen} alt={prod.nombre} />
              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>

              <span className="precio">${prod.precio.toLocaleString('es-CL')}</span>

              <button
                className="boton-añadir"
                onClick={() => agregar(prod)}
                disabled={prod.stock === 0}
              >
                {prod.stock > 0 ? 'Añadir Oferta' : 'Agotado'}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default Ofertas;
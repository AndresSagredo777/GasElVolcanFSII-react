import React from 'react';
import { Link } from 'react-router-dom';

function PagPrincipal({ productos = [], agregar }) {
  const destacados = productos.slice(0, 4);

  return (
    <main className="contenedor-principal">
      <section className="hero-home">
        <div className="contenido-hero">
          <span className="insignia-hero">🔥 Distribuidor Oficial de Gas Licuado</span>
          <h1>El Gas de tu Hogar, Rápido y en la Puerta</h1>
          <p className="bajada-hero-home">
            Reparto exprés de cilindros y accesorios en Puente Alto y la Región Metropolitana. 
            Seguridad garantizada y atención los 7 días de la semana.
          </p>
          <div className="acciones-hero">
            <Link to="/productos" className="boton btn-hero-primario">
              Ver Catálogo Completo
            </Link>
            <a href="tel:999999999" className="boton btn-hero-secundario">
              📞 Pedir por Teléfono
            </a>
          </div>
        </div>
      </section>

      <section className="grilla-beneficios">
        <article className="tarjeta-beneficio">
          <div className="icono-beneficio">⚡</div>
          <h3>Entrega Exprés</h3>
          <p>Llegamos a tu domicilio en un tiempo promedio de 30 a 45 minutos.</p>
        </article>

        <article className="tarjeta-beneficio">
          <div className="icono-beneficio">🛡️</div>
          <h3>Cilindros Normados</h3>
          <p>Garantía de sellado de fábrica y certificación SEC en cada entrega.</p>
        </article>

        <article className="tarjeta-beneficio">
          <div className="icono-beneficio">💳</div>
          <h3>Múltiples Pagos</h3>
          <p>Paga con efectivo o tarjetas de débito/crédito al recibir tu pedido.</p>
        </article>
      </section>

      <section className="seccion-destacados">
        <div className="cabecera-seccion">
          <h2>Productos Más Pedidos</h2>
          <Link to="/productos" className="link-ver-mas">
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grilla-productos">
          {destacados.map((prod) => {
            // Asegura la ruta correcta de las imágenes de productos.js
            const rutaImagen = prod.imagen 
              ? (prod.imagen.startsWith('/') ? prod.imagen : `/${prod.imagen}`) 
              : (prod.img || '/assets/cilindro11kg.png');

            return (
              <article className="Producto" key={prod.id}>
                <img src={rutaImagen} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion || prod.desc}</p>
                
                <p style={{ fontSize: '0.85rem', color: prod.stock > 0 ? '#276749' : '#e53e3e', fontWeight: 'bold' }}>
                  {prod.stock > 0 ? `Stock disponible: ${prod.stock} un.` : 'Agotado'}
                </p>

                <span className="precio">${prod.precio.toLocaleString('es-CL')}</span>
                
                <button 
                  className="boton-añadir" 
                  onClick={() => agregar(prod)}
                  disabled={prod.stock === 0}
                  style={prod.stock === 0 ? { backgroundColor: '#cbd5e1', cursor: 'not-allowed' } : {}}
                >
                  {prod.stock > 0 ? 'Añadir al pedido' : 'Sin Stock'}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="banner-cta-home">
        <div className="texto-cta">
          <h2>¿Se te acabó el gas en mitad de la cocina?</h2>
          <p>Haz tu pedido online ahora mismo y te asignamos el repartidor más cercano.</p>
        </div>
        <Link to="/productos" className="boton btn-cta-solido">
          Pide tu Cilindro Ahora
        </Link>
      </section>
    </main>
  );
}

export default PagPrincipal;
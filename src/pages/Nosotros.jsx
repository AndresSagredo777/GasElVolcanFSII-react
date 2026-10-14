import React from 'react';
import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    <main className="contenedor-principal">
      
      <section className="hero-nosotros text-center">
        <span className="insignia-subtitulo">Gas El Volcan</span>
        <h1>Energía Segura y Confiable para tu Hogar</h1>
        <p className="bajada-hero">
          Llevamos más de 10 años siendo el distribuidor oficial de confianza en la zona, 
          garantizando calor y abastecimiento ininterrumpido a miles de familias y comercios.
        </p>
      </section>

      <section className="barras-metricas">
        <div className="bloque-metrica">
          <span className="numero-metrica">+10</span>
          <span className="label-metrica">Años de experiencia</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">+15.000</span>
          <span className="label-metrica">Cilindros entregados</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">30 min</span>
          <span className="label-metrica">Promedio de entrega</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">100%</span>
          <span className="label-metrica">Cilindros normados SEC</span>
        </div>
      </section>

      <section className="grilla-tarjetas-nosotros">
        <article className="tarjeta-pilar">
          <div className="icono-pilar">🎯</div>
          <h3>Nuestra Misión</h3>
          <p>
            Garantizar un abastecimiento rápido, seguro y con cilindros certificados para cada uno de nuestros clientes, manteniendo las tarifas más competitivas de la zona.
          </p>
        </article>

        <article className="tarjeta-pilar">
          <div className="icono-pilar">⏱️</div>
          <h3>Puntualidad Garantizada</h3>
          <p>
            Contamos con una flota propia distribuida estratégicamente para responder a tus llamadas de inmediato y llegar a tu puerta en el menor tiempo posible.
          </p>
        </article>

        <article className="tarjeta-pilar">
          <div className="icono-pilar">🛡️</div>
          <h3>Seguridad Certificada</h3>
          <p>
            Cada cilindro y accesorio pasa por un riguroso proceso de revisión de hermeticidad y sello de seguridad antes de salir de nuestra central.
          </p>
        </article>

        <article className="tarjeta-pilar">
          <div className="icono-pilar">🤝</div>
          <h3>Atención Cercana</h3>
          <p>
            Somos vecinos de la comuna. Nuestro compromiso es brindar una atención humana, respetuosa y orientada a solucionar tus necesidades energéticas.
          </p>
        </article>
      </section>

      <section className="banner-cta-nosotros text-center">
        <h2>¿Necesitas cilindros o accesorios hoy?</h2>
        <p>Pide en línea en menos de 2 minutos con despacho a tu domicilio.</p>
        <Link to="/productos" className="boton mt-3">
          Ver Catálogo de Productos
        </Link>
      </section>
    </main>
  );
}

export default Nosotros;
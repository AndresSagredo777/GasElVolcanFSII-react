import React from 'react';
import { Link } from 'react-router-dom';

function Cobertura() {
  const comunas = [
    {
      nombre: 'Puente Alto',
      tiempo: '20 - 35 min',
      estado: 'Despacho Exprés',
      desc: 'Central principal de distribución. Entregas en todos los sectores.'
    },
    {
      nombre: 'La Florida',
      tiempo: '30 - 45 min',
      estado: 'Cobertura Completa',
      desc: 'Reparto diario continuado desde San José de la Estrella hasta Paradero 14.'
    },
    {
      nombre: 'Pirque',
      tiempo: '35 - 50 min',
      estado: 'Despacho Diario',
      desc: 'Rutas mañanas y tardes hacia el sector urbano y rural de la comuna.'
    },
    {
      nombre: 'San Bernardo',
      tiempo: '40 - 55 min',
      estado: 'Ruta Programada',
      desc: 'Envíos diarios organizados por sectores para máxima eficiencia.'
    }
  ];

  return (
    <main className="contenedor-principal">
      <section className="hero-nosotros text-center">
        <span className="insignia-subtitulo">Zona de Reparto</span>
        <h1>Cobertura de Despacho a Domicilio</h1>
        <p className="bajada-hero">
          Llegamos a tu hogar o negocio con repartidores capacitados y vehículos equipados para el transporte seguro de gas GLP.
        </p>
      </section>

      <div className="grilla-cobertura">
        {comunas.map((item, index) => (
          <article className="tarjeta-cobertura" key={index}>
            <div className="cabecera-tarjeta-cobertura">
              <div className="icono-ubicacion">📍</div>
              <span className="badge-estado">{item.estado}</span>
            </div>
            <h3>{item.nombre}</h3>
            <p className="desc-cobertura">{item.desc}</p>
            <div className="info-tiempo">
              <span>⏱️ Tiempo estimado:</span>
              <strong>{item.tiempo}</strong>
            </div>
          </article>
        ))}
      </div>

      <section className="caja-info-despacho">
        <div className="icono-info">🚛</div>
        <div>
          <h3>Información del Servicio de Entrega</h3>
          <ul>
            <li><strong>Costo de despacho:</strong> $2.000 tarifa fija promocional por pedido.</li>
            <li><strong>Medios de pago en domicilio:</strong> Efectivo o Tarjeta (POS Débito/Crédito).</li>
            <li><strong>Horarios de reparto:</strong> Lunes a Sábado de 08:30 a 20:00 hrs. Domingos de 09:00 a 17:00 hrs.</li>
          </ul>
          <Link to="/productos" className="boton mt-3" style={{ display: 'inline-block' }}>
            Hacer un Pedido Ahora
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Cobertura;
import { Link } from 'react-router-dom';
import { comunas } from '../data/comunas'

function Cobertura() {
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
        {comunas.map((item) => (
          <article className="tarjeta-cobertura" key={item.nombre}>
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
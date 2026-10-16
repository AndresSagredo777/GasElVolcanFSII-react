import TarjetaProducto from '../components/TarjetaProducto';
import { filtrarOfertas } from '../utils/productos';

function Ofertas({ productos = [], agregarAlCarrito }) {
  const productosEnOferta = filtrarOfertas(productos);

  return (
    <div className="contenedor-principal">
      <div className="banner-ofertas" style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#e65100', color: '#fff', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>🔥 Promociones y Ofertas de la Semana</h2>
        <p>Aprovecha precios rebajados en cilindros seleccionados y kits de conexión.</p>
      </div>

      <div className="grilla-tarjetas">
        {productosEnOferta.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
        ))}
      </div>
    </div>
  );
}

export default Ofertas;
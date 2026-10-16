import { formatearPrecio } from '../utils/precio';
import { describirStock, obtenerRutaImagen } from '../utils/funcionesProductos';

function TarjetaProducto({ producto, onAgregar }) {
  const hayStock = producto.stock > 0;

  return (
    <article className="Producto">
      <img src={obtenerRutaImagen(producto)} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>

      <p className={hayStock ? 'stock-disponible' : 'stock-agotado'}>
        {describirStock(producto.stock)}
      </p>

      <span className="precio">{formatearPrecio(producto.precio)}</span>

      <button
        className="boton-añadir"
        onClick={() => onAgregar(producto)}
        disabled={!hayStock}
      >
        {hayStock ? 'Añadir al pedido' : 'Sin Stock'}
      </button>
    </article>
  );
}

export default TarjetaProducto;
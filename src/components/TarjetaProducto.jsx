import { formatearPrecio } from '../utils/precio';
import {describirStock,obtenerRutaImagen,textoOferta,usarImagenPorDefecto} from '../utils/productos';

function TarjetaProducto({ producto, onAgregar }) {
  const hayStock = producto.stock > 0;

  return (
    <article className="tarjeta-producto">
      {producto.oferta && (
        <span className="etiqueta-oferta">🔥 {textoOferta(producto)}</span>
      )}

      <div className="tarjeta-imagen">
        <img
          src={obtenerRutaImagen(producto)}
          alt={producto.nombre}
          onError={usarImagenPorDefecto}
        />
      </div>

      <h3>{producto.nombre}</h3>
      <p className="tarjeta-descripcion">{producto.descripcion}</p>

      <p className={hayStock ? 'stock-disponible' : 'stock-agotado'}>
        {describirStock(producto.stock)}
      </p>

      <div className="tarjeta-precio">
        {producto.oferta && producto.precioAnterior && (
          <span className="precio-anterior">
            {formatearPrecio(producto.precioAnterior)}
          </span>
        )}
        <span className={producto.oferta ? 'precio-actual en-oferta' : 'precio-actual'}>
          {formatearPrecio(producto.precio)}
        </span>
      </div>

      <button
        type="button"
        className="boton-agregar"
        onClick={() => onAgregar(producto)}
        disabled={!hayStock}
      >
        {hayStock ? 'Añadir al pedido' : 'Sin Stock'}
      </button>
    </article>
  );
}

export default TarjetaProducto;
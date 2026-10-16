import { useState } from 'react';
import TarjetaProducto from '../components/TarjetaProducto';
import { filtrarPorCategoria, obtenerCategorias } from '../utils/productos';

function CarteleraProductos({ productos = [], agregarAlCarrito }) {
  const [categoriaSel, setCategoriaSel] = useState('todas');

  const categorias = obtenerCategorias(productos);
  const productosFiltrados = filtrarPorCategoria(productos, categoriaSel);

  return (
    <div className="contenedor-principal">
      <header className="encabezado-catalogo">
        <h1>Catálogo de Productos</h1>
        <p>Selecciona tus productos y añádelos a tu pedido.</p>
      </header>

      <div className="filtros-categoria">
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`boton-categoria ${categoriaSel === cat ? 'activa' : ''}`}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat === 'todas' ? 'Todos los productos' : cat}
          </button>
        ))}
      </div>

      <div className="grilla-tarjetas">
        {productosFiltrados.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
        ))}
      </div>
    </div>
  );
}

export default CarteleraProductos;
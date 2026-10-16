import { useState } from 'react';
import TarjetaProducto from '../components/TarjetaProducto';
import { filtrarPorCategoria, obtenerCategorias } from '../utils/funcionesProductos';

function CarteleraProductos({ productos, agregar }) {
  const [categoriaSel, setCategoriaSel] = useState('todas');

  const categorias = obtenerCategorias(productos);
  const productosFiltrados = filtrarPorCategoria(productos, categoriaSel);

  return (
    <main className="contenedor-principal">
      <h1>Catálogo de Productos</h1>
      <p>Selecciona tus productos y añádelos a tu pedido.</p>

      <div className="filtros-categoria">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`boton-categoria ${categoriaSel === cat ? 'activa' : ''}`}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat === 'todas' ? 'Todos los productos' : cat}
          </button>
        ))}
      </div>

      <div className="grilla-productos">
        {productosFiltrados.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} onAgregar={agregar} />
        ))}
      </div>
    </main>
  );
}
export default CarteleraProductos;
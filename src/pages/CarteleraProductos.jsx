import React, { useState } from 'react';

function CarteleraProductos({ productos, agregar }) {
  const [categoriaSel, setCategoriaSel] = useState('todas');

  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = categoriaSel === 'todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSel);

  return (
    <main className="contenedor-principal">
      <h1>Catálogo de Productos</h1>
      <p>Selecciona tus productos y añádelos a tu pedido.</p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
        {categorias.map((cat) => (
          <button 
            key={cat}
            onClick={() => setCategoriaSel(cat)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              border: '1px solid var(--color-secundario)',
              backgroundColor: categoriaSel === cat ? 'var(--color-primario)' : 'white',
              color: categoriaSel === cat ? 'white' : 'var(--color-secundario)',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'todas' ? 'Todos los productos' : cat}
          </button>
        ))}
      </div>

      <div className="grilla-productos">
        {productosFiltrados.map((prod) => {
          const rutaImagen = prod.imagen ? `/${prod.imagen}` : prod.img;
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
    </main>
  );
}
export default CarteleraProductos;
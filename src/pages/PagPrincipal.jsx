import { Link } from 'react-router-dom';
import TarjetaProducto from '../components/TarjetaProducto';
import { obtenerDestacados } from '../utils/funcionesProductos';

function PagPrincipal({ productos = [], agregarAlCarrito }) {
  const productosDestacados = obtenerDestacados(productos);

  return (
    <div className="contenedor-principal" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Banner Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        marginBottom: '3rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Bienvenido a Gas El Volcan
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 1.8rem auto', lineHeight: '1.6' }}>
          Distribución rápida y segura de gas licuado y accesorios para tu hogar o negocio.
        </p>
        <Link
          to="/productos"
          style={{
            display: 'inline-block',
            backgroundColor: '#e65100',
            color: '#fff',
            padding: '0.85rem 2rem',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(230, 81, 0, 0.25)'
          }}
        >
          Ver Catálogo Completo
        </Link>
      </section>

      {/* Productos Destacados */}
      <section>
        <h2 style={{ fontSize: '1.8rem', color: '#1e293b', fontWeight: '700', marginBottom: '1.5rem' }}>
          Productos Destacados
        </h2>

        <div className="grilla-tarjetas">
          {productosDestacados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default PagPrincipal;
import { Link, useLocation } from 'react-router-dom';

function PagoExitoso() {
  const { state } = useLocation();
  const pedido = state?.pedido;

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login" style={{ maxWidth: '650px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
        {pedido && (
          <span className="badge-estado" style={{ backgroundColor: '#c6f6d5', color: '#22543d' }}>
            Pedido #{pedido.id} · {pedido.estado}
          </span>
        )}
        <h1 style={{ color: 'var(--color-secundario)', marginTop: '0.5rem' }}>Pedido registrado</h1>
        <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
          {pedido
            ? 'El pedido quedó guardado. El pago y el despacho se coordinan fuera de esta aplicación.'
            : 'No hay un pedido reciente para mostrar.'}
        </p>

        {pedido && (
          <div style={{ textAlign: 'left', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--color-secundario)', marginBottom: '0.5rem' }}>Detalle de entrega:</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Cliente:</strong> {pedido.nombreDestinatario}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Dirección:</strong> {pedido.direccion}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Teléfono:</strong> {pedido.telefono}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Total de productos:</strong> {'$' + Number(pedido.total).toLocaleString('es-CL')}</p>
          </div>
        )}

        <Link to="/" className="boton" style={{ width: '100%' }}>Volver a la Tienda</Link>
      </div>
    </main>
  );
}

export default PagoExitoso;

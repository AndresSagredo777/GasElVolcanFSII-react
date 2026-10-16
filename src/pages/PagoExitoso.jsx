import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generarNumeroOrden } from '../utils/ordenes';

function PagoExitoso() {
  const location = useLocation();
  const datos = location.state || {};
  const [nroOrdenNuevo] = useState(generarNumeroOrden);
  const nroOrden = datos.nroOrden || nroOrdenNuevo;

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login" style={{ maxWidth: '650px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
        <span className="badge-estado" style={{ backgroundColor: '#c6f6d5', color: '#22543d' }}>
          Código {nroOrden.replace(/^#/, '')}
        </span>
        <h1 style={{ color: 'var(--color-secundario)', marginTop: '0.5rem' }}>Pedido de demostración registrado</h1>
        <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
          Gracias por tu pedido. Esta versión no realiza cobros ni envía la solicitud a un sistema de despacho.
        </p>

        {datos.cliente && (
          <div style={{ textAlign: 'left', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--color-secundario)', marginBottom: '0.5rem' }}>Detalle de Entrega:</h3>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Cliente:</strong> {datos.cliente.nombre}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Dirección:</strong> {datos.cliente.direccion}, {datos.cliente.comuna}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Teléfono:</strong> {datos.cliente.telefono}</p>
            <p style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}><strong>Total referencial:</strong> ${datos.total?.toLocaleString('es-CL')}</p>
          </div>
        )}

        <Link to="/" className="boton" style={{ width: '100%' }}>Volver a la Tienda</Link>
      </div>
    </main>
  );
}

export default PagoExitoso;

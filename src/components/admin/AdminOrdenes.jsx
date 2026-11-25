import { useState } from 'react';
import { formatearPrecio } from '../../utils/precio';

function AdminOrdenes({ ordenes = [] }) {
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  return (
    <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
      <h2 style={{ color: 'var(--color-secundario)', marginBottom: '1rem' }}>
        Registro de Boletas y Órdenes ({ordenes.length})
      </h2>

      {ordenes.length === 0 ? (
        <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
          <p style={{ margin: 0 }}>Aún no hay boletas u órdenes registradas. Realiza un pedido desde el carrito para visualizarlo aquí.</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)', backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '0.8rem' }}>N° Orden</th>
              <th style={{ padding: '0.8rem' }}>Fecha</th>
              <th style={{ padding: '0.8rem' }}>Cliente</th>
              <th style={{ padding: '0.8rem' }}>Comuna</th>
              <th style={{ padding: '0.8rem' }}>Total</th>
              <th style={{ padding: '0.8rem' }}>Estado</th>
              <th style={{ padding: '0.8rem', textAlign: 'center' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'var(--color-secundario)' }}>{orden.numero}</td>
                <td style={{ padding: '0.8rem' }}>{orden.fecha}</td>
                <td style={{ padding: '0.8rem' }}>{orden.cliente?.nombre}</td>
                <td style={{ padding: '0.8rem' }}>{orden.cliente?.comuna}</td>
                <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{formatearPrecio(orden.total)}</td>
                <td style={{ padding: '0.8rem' }}>
                  <span className="badge-estado">{orden.estado}</span>
                </td>
                <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setOrdenSeleccionada(orden)}
                    style={{ background: '#e2e8f0', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    👁️ Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {ordenSeleccionada && (
        <div className="modal-pago">
          <div className="contenido-modal" style={{ maxWidth: '560px' }}>
            <div className="cabecera-modal">
              <h2>Detalle de Boleta {ordenSeleccionada.numero}</h2>
              <button type="button" className="btn-eliminar" onClick={() => setOrdenSeleccionada(null)}>✕</button>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <p style={{ margin: '0.25rem 0' }}><strong>Fecha:</strong> {ordenSeleccionada.fecha}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Cliente:</strong> {ordenSeleccionada.cliente?.nombre}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Dirección:</strong> {ordenSeleccionada.cliente?.direccion}, {ordenSeleccionada.cliente?.comuna}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Teléfono:</strong> {ordenSeleccionada.cliente?.telefono}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Método de Pago:</strong> {ordenSeleccionada.cliente?.metodoPago === 'transbank' ? 'Tarjeta Débito/Crédito (POS)' : 'Efectivo al repartidor'}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.5rem' }}>Producto</th>
                  <th style={{ padding: '0.5rem' }}>Cant.</th>
                  <th style={{ padding: '0.5rem' }}>Precio Unit.</th>
                  <th style={{ padding: '0.5rem' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {ordenSeleccionada.items?.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '0.5rem' }}>{item.nombre}</td>
                    <td style={{ padding: '0.5rem' }}>{item.cantidad}</td>
                    <td style={{ padding: '0.5rem' }}>{formatearPrecio(item.precio)}</td>
                    <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{formatearPrecio(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #e2e8f0', paddingTop: '0.8rem' }}>
              <strong>Total Pagado (incluye despacho):</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-primario)' }}>
                {formatearPrecio(ordenSeleccionada.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminOrdenes;
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/precio';
import { obtenerRolUsuario } from '../utils/usuarios';

function Perfil({ usuarioActual = null, ordenes = [], cerrarSesion }) {
  if (!usuarioActual) {
    return (
      <main className="contenedor-principal text-center py-5">
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión para ver tu perfil.</p>
        <Link to="/login" className="boton mt-3">
          Ir a Iniciar Sesión
        </Link>
      </main>
    );
  }

  const rol = obtenerRolUsuario(usuarioActual);
  const etiquetasRol = {
    admin: 'Administrador',
    vendedor: 'Vendedor',
    cliente: 'Cliente',
  };

  const misOrdenes = ordenes.filter(
    (orden) =>
      orden.cliente?.nombre?.toLowerCase() === usuarioActual.nombre?.toLowerCase()
  );

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login" style={{ maxWidth: '680px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h1 style={{ color: 'var(--color-secundario)', margin: 0, fontSize: '1.6rem' }}>
            Mi Perfil
          </h1>
          <span className="badge-estado">
            Rol: {etiquetasRol[rol] || 'Cliente'}
          </span>
        </div>

        <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0.35rem 0' }}><strong>Nombre:</strong> {usuarioActual.nombre}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Correo:</strong> {usuarioActual.email}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Teléfono:</strong> {usuarioActual.telefono || 'Sin registrar'}</p>
          <p style={{ margin: '0.35rem 0' }}><strong>Dirección:</strong> {usuarioActual.direccion || 'Sin registrar'}</p>
        </div>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-secundario)', marginBottom: '0.8rem' }}>
          Historial de Pedidos ({misOrdenes.length})
        </h2>

        {misOrdenes.length === 0 ? (
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            Aún no registras pedidos asociados a tu cuenta.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {misOrdenes.map((orden) => (
              <div
                key={orden.id}
                style={{
                  padding: '0.9rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>Orden {orden.numero}</strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {orden.fecha} · {orden.items.length} producto(s)
                  </div>
                </div>
                <strong style={{ color: 'var(--color-primario)' }}>
                  {formatearPrecio(orden.total)}
                </strong>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {(rol === 'admin' || rol === 'vendedor') && (
            <Link to="/admin" className="boton">
              Ir al Panel de Gestión
            </Link>
          )}
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => cerrarSesion?.()}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </main>
  );
}

export default Perfil;
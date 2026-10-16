import { Link, useNavigate } from 'react-router-dom';

function PagoError() {
  const navigate = useNavigate();

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', color: '#e53e3e', marginBottom: '0.5rem' }}>❌</div>
        <h1 style={{ color: '#e53e3e' }}>No se pudo realizar el pago</h1>
        <p style={{ color: '#4a5568', margin: '1rem 0 1.5rem 0' }}>
          Ocurrió un problema durante el procesamiento de tu transacción o la conexión falló.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="boton" onClick={() => navigate('/carrito')}>
            Volver a intentar el pago
          </button>
          <Link to="/" className="btn-cancelar" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Ir al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PagoError;

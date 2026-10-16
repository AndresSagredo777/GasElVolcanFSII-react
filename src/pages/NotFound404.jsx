import { Link } from 'react-router-dom';

function NotFound404() {
  return (
    <main className="container py-5 text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h3 className="mb-3">Página No Encontrada</h3>
      <p className="text-muted mb-4">
        La ruta que intentas visitar no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-warning text-white fw-bold px-4">
        Volver al Inicio
      </Link>
    </main>
  );
}

export default NotFound404;
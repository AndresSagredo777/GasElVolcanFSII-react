import { Link, useParams } from 'react-router-dom';
import { articulosBlog } from '../data/articulosBlog';

function DetalleBlog() {
  const { id } = useParams();
  const articulo = articulosBlog.find((item) => item.id === Number(id));

  if (!articulo) {
    return (
      <main className="contenedor-principal text-center py-5">
        <h2>Artículo no encontrado</h2>
        <p>La publicación que buscas no existe o fue movida.</p>
        <Link to="/blog" className="boton mt-3">
          Volver al Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="contenedor-principal">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link
          to="/blog"
          style={{ textDecoration: 'none', color: 'var(--color-primario)', fontWeight: 'bold' }}
        >
          ← Volver al Blog
        </Link>

        <article
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            marginTop: '1rem',
          }}
        >
          <span className="insignia-subtitulo">{articulo.fecha}</span>
          <h1 style={{ color: 'var(--color-secundario)', margin: '0.5rem 0 0.4rem 0' }}>
            {articulo.titulo}
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Por {articulo.autor}
          </p>

          {articulo.contenido.map((parrafo, index) => (
            <p key={index} style={{ color: '#2d3748', lineHeight: '1.7', marginBottom: '1rem' }}>
              {parrafo}
            </p>
          ))}
        </article>
      </div>
    </main>
  );
}

export default DetalleBlog;
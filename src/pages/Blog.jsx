import { Link } from 'react-router-dom';
import { articulosBlog } from '../data/articulosBlog';

function Blog() {
  return (
    <main className="contenedor-principal">
      <section className="hero-nosotros text-center">
        <span className="insignia-subtitulo">Consejos y Novedades</span>
        <h1>Blog Gas El Volcan</h1>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {articulosBlog.map((art) => (
          <article
            key={art.id}
            style={{
              background: '#fff',
              padding: '1.8rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{art.fecha}</span>
            <h2 style={{ color: 'var(--color-secundario)', margin: '0.4rem 0 0.8rem 0', fontSize: '1.3rem' }}>
              {art.titulo}
            </h2>
            <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1rem' }}>
              {art.resumen}
            </p>
            <Link to={`/blog/${art.id}`} className="link-ver-mas">
              Leer artículo completo →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Blog;
import React from 'react';

function Blog() {
  const articulos = [
    {
      id: 1,
      titulo: 'Consejos para la manipulación segura de cilindros en invierno',
      fecha: '10 de Octubre, 2026',
      resumen: 'Aprende cómo verificar la estanqueidad de las mangueras y el correcto uso del regulador durante bajas temperaturas.'
    },
    {
      id: 2,
      titulo: '¿Cómo elegir entre cilindros de 11 kg y 15 kg para tu hogar?',
      fecha: '02 de Octubre, 2026',
      resumen: 'Calcula el consumo promedio de tu calefacción o cocina para optimizar el gasto de gas licuado.'
    }
  ];

  return (
    <main className="contenedor-principal">
      <section className="hero-nosotros text-center">
        <span className="insignia-subtitulo">Consejos y Novedades</span>
        <h1>Blog Gas El Volcan</h1>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {articulos.map((art) => (
          <article key={art.id} style={{ background: '#fff', padding: '1.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{art.fecha}</span>
            <h2 style={{ color: 'var(--color-secundario)', margin: '0.4rem 0 0.8rem 0', fontSize: '1.3rem' }}>{art.titulo}</h2>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>{art.resumen}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Blog;
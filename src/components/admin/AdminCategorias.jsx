import { useState } from 'react';

function AdminCategorias({ productos = [], categorias = [], onAgregarCategoria }) {
  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const limpia = nuevaCategoria.trim();
    if (!limpia) return;
    onAgregarCategoria?.(limpia);
    setNuevaCategoria('');
  };

  return (
    <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ color: 'var(--color-secundario)', marginBottom: '1rem' }}>
        Gestión de Categorías ({categorias.length})
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría (ej. Estufas y Calefacción)"
          style={{ flex: 1, minWidth: '240px', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button type="submit" className="boton">
          ➕ Agregar Categoría
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)', backgroundColor: '#f8fafc' }}>
            <th style={{ padding: '0.8rem' }}>Categoría</th>
            <th style={{ padding: '0.8rem' }}>Productos Asociados</th>
            <th style={{ padding: '0.8rem' }}>Unidades en Stock</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => {
            const itemsCat = productos.filter((p) => p.categoria === cat);
            const unidades = itemsCat.reduce((acc, p) => acc + Number(p.stock || 0), 0);
            return (
              <tr key={cat} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'var(--color-secundario)' }}>{cat}</td>
                <td style={{ padding: '0.8rem' }}>{itemsCat.length} producto(s)</td>
                <td style={{ padding: '0.8rem' }}>{unidades} un.</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AdminCategorias;
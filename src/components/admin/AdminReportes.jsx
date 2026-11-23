import { formatearPrecio } from '../../utils/precio';

function AdminReportes({ productos = [], ordenes = [] }) {
  const ingresosTotales = ordenes.reduce((acc, o) => acc + Number(o.total || 0), 0);
  const valorInventario = productos.reduce(
    (acc, p) => acc + Number(p.precio || 0) * Number(p.stock || 0),
    0
  );
  const productosEnOferta = productos.filter((p) => p.oferta).length;
  const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];

  return (
    <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ color: 'var(--color-secundario)', marginBottom: '1.2rem' }}>
        Reportes de Ventas e Inventario
      </h2>

      <div className="barras-metricas" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        <div className="bloque-metrica">
          <span className="numero-metrica">{formatearPrecio(ingresosTotales)}</span>
          <span className="label-metrica">Ingresos por Ventas</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">{ordenes.length}</span>
          <span className="label-metrica">Boletas Emitidas</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">{formatearPrecio(valorInventario)}</span>
          <span className="label-metrica">Valorización de Stock</span>
        </div>
        <div className="bloque-metrica">
          <span className="numero-metrica">{productosEnOferta}</span>
          <span className="label-metrica">Productos en Oferta</span>
        </div>
      </div>

      <h3 style={{ color: 'var(--color-secundario)', fontSize: '1.1rem', marginBottom: '0.8rem' }}>
        Distribución de Inventario por Categoría
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)', backgroundColor: '#f8fafc' }}>
            <th style={{ padding: '0.8rem' }}>Categoría</th>
            <th style={{ padding: '0.8rem' }}>Ítems</th>
            <th style={{ padding: '0.8rem' }}>Stock Total</th>
            <th style={{ padding: '0.8rem' }}>Valorización</th>
          </tr>
        </thead>
        <tbody>
          {categoriasUnicas.map((cat) => {
            const lista = productos.filter((p) => p.categoria === cat);
            const stockCat = lista.reduce((acc, p) => acc + Number(p.stock || 0), 0);
            const valorCat = lista.reduce((acc, p) => acc + Number(p.precio || 0) * Number(p.stock || 0), 0);
            return (
              <tr key={cat} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{cat}</td>
                <td style={{ padding: '0.8rem' }}>{lista.length}</td>
                <td style={{ padding: '0.8rem' }}>{stockCat} un.</td>
                <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{formatearPrecio(valorCat)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default AdminReportes;
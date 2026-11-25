import { useState } from 'react';
import {
  contarCategorias,
  normalizarProducto,
  obtenerRutaImagen,
  obtenerStockCritico,
  usarImagenPorDefecto,
} from '../utils/funcionesProductos';
import { formatearPrecio } from '../utils/precio';
import { obtenerRolUsuario } from '../utils/usuarios';
import AdminOrdenes from '../components/admin/AdminOrdenes';
import AdminCategorias from '../components/admin/AdminCategorias';
import AdminReportes from '../components/admin/AdminReportes';
import { eliminarProductoAPI, guardarProductoAPI } from '../services/catalogoApi';

function AdminDashboard({ productos, setProductos, usuarios = [], ordenes = [], usuarioActual = null }) {
  const rol = obtenerRolUsuario(usuarioActual);
  const esVendedor = rol === 'vendedor';

  const [pestana, setPestana] = useState(esVendedor ? 'productos' : 'dashboard');
  const [modoEdicion, setModoEdicion] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [categoriasExtra, setCategoriasExtra] = useState([]);
  const [guardandoProducto, setGuardandoProducto] = useState(false);
  const [errorProducto, setErrorProducto] = useState('');

  const categoriasDisponibles = [
    ...new Set([...productos.map((p) => p.categoria), ...categoriasExtra]),
  ];

  const [formProducto, setFormProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Cilindros de Gas',
    precio: '',
    stock: '',
    oferta: false,
    precioAnterior: '',
    descuento: '',
    imagen: 'assets/cilindro11kg.png',
    descripcion: '',
  });

  const totalProductos = productos.length;
  const productosCriticos = obtenerStockCritico(productos);
  const totalUsuarios = usuarios.length;
  const totalCategorias = categoriasDisponibles.length || contarCategorias(productos);

  const handleAgregarCategoria = (nombreCat) => {
    if (!categoriasDisponibles.some((c) => c.toLowerCase() === nombreCat.toLowerCase())) {
      setCategoriasExtra((prev) => [...prev, nombreCat]);
    }
  };

  const handleNuevo = () => {
    setModoEdicion(null);
    setFormProducto({
      codigo: '',
      nombre: '',
      categoria: categoriasDisponibles[0] || 'Cilindros de Gas',
      precio: '',
      stock: '',
      oferta: false,
      precioAnterior: '',
      descuento: '',
      imagen: 'assets/cilindro11kg.png',
      descripcion: '',
    });
    setMostrarModal(true);
  };

  const handleEditar = (prod) => {
    setModoEdicion(prod.id);
    setFormProducto({
      codigo: prod.codigo || '',
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio,
      stock: prod.stock,
      oferta: prod.oferta || false,
      precioAnterior: prod.precioAnterior ?? '',
      descuento: prod.descuento ?? '',
      imagen: prod.imagen || 'assets/cilindro11kg.png',
      descripcion: prod.descripcion || '',
    });
    setMostrarModal(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del inventario?')) {
      try {
        await eliminarProductoAPI(id);
        setProductos((actuales) => actuales.filter((producto) => producto.id !== Number(id)));
      } catch (error) {
        window.alert(`No se pudo eliminar el producto: ${error.message}`);
      }
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setGuardandoProducto(true);
    setErrorProducto('');
    try {
      const datosNormalizados = normalizarProducto(formProducto);
      const precioAnterior = formProducto.oferta ? Math.floor(Number(formProducto.precioAnterior)) : null;
      const descuento = formProducto.oferta ? Math.floor(Number(formProducto.descuento)) : null;
      const producto = await guardarProductoAPI({
        codigo: formProducto.codigo.trim() || null,
        nombre: formProducto.nombre.trim(),
        categoria: formProducto.categoria.trim(),
        precio: datosNormalizados.precio,
        precioAnterior,
        descuento,
        stock: datosNormalizados.stock,
        oferta: Boolean(formProducto.oferta),
        imagen: formProducto.imagen.trim(),
        descripcion: formProducto.descripcion.trim() || null,
      }, modoEdicion);
      setProductos((actuales) => modoEdicion
        ? actuales.map((item) => item.id === Number(modoEdicion) ? producto : item)
        : [...actuales, producto]);
      setMostrarModal(false);
    } catch (error) {
      setErrorProducto(error.message || 'No se pudo guardar el producto.');
    } finally {
      setGuardandoProducto(false);
    }
  };

  return (
    <main className="contenedor-principal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge-estado" style={{ backgroundColor: '#edf2f7', color: 'var(--color-secundario)' }}>
            {esVendedor ? '📋 Módulo de Vendedor' : '⚙️ Módulo Administrativo'}
          </span>
          <h1 style={{ color: 'var(--color-secundario)', margin: '0.3rem 0 0 0' }}>
            {esVendedor ? 'Consulta de Productos y Órdenes' : 'Panel de Control (Dashboard)'}
          </h1>
        </div>

        {!esVendedor && (
          <button className="boton" onClick={handleNuevo}>
            ➕ Agregar Nuevo Producto
          </button>
        )}
      </div>

      <div className="pestanas-login" style={{ marginBottom: '2rem', flexWrap: 'wrap' }}>
        {!esVendedor && (
          <button
            className={`btn-pestana ${pestana === 'dashboard' ? 'activa' : ''}`}
            onClick={() => setPestana('dashboard')}
          >
            📊 Métrica y Resumen
          </button>
        )}
        <button
          className={`btn-pestana ${pestana === 'productos' ? 'activa' : ''}`}
          onClick={() => setPestana('productos')}
        >
          📦 Productos ({totalProductos})
        </button>
        <button
          className={`btn-pestana ${pestana === 'ordenes' ? 'activa' : ''}`}
          onClick={() => setPestana('ordenes')}
        >
          📜 Boletas / Órdenes ({ordenes.length})
        </button>
        {!esVendedor && (
          <>
            <button
              className={`btn-pestana ${pestana === 'categorias' ? 'activa' : ''}`}
              onClick={() => setPestana('categorias')}
            >
              🏷️ Categorías ({totalCategorias})
            </button>
            <button
              className={`btn-pestana ${pestana === 'usuarios' ? 'activa' : ''}`}
              onClick={() => setPestana('usuarios')}
            >
              👥 Usuarios ({totalUsuarios})
            </button>
            <button
              className={`btn-pestana ${pestana === 'reportes' ? 'activa' : ''}`}
              onClick={() => setPestana('reportes')}
            >
              📈 Reportes
            </button>
          </>
        )}
      </div>

      {!esVendedor && pestana === 'dashboard' && (
        <section>
          <div className="barras-metricas" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="bloque-metrica" style={{ borderLeft: '4px solid var(--color-secundario)' }}>
              <span className="numero-metrica">{totalProductos}</span>
              <span className="label-metrica">Productos en Catálogo</span>
            </div>
            <div className="bloque-metrica" style={{ borderLeft: '4px solid #e53e3e' }}>
              <span className="numero-metrica" style={{ color: '#e53e3e' }}>{productosCriticos.length}</span>
              <span className="label-metrica">Stock Crítico (≤ 5 un.)</span>
            </div>
            <div className="bloque-metrica" style={{ borderLeft: '4px solid var(--color-primario)' }}>
              <span className="numero-metrica">{totalCategorias}</span>
              <span className="label-metrica">Categorías Activas</span>
            </div>
            <div className="bloque-metrica" style={{ borderLeft: '4px solid #38a169' }}>
              <span className="numero-metrica" style={{ color: '#38a169' }}>{totalUsuarios}</span>
              <span className="label-metrica">Usuarios Registrados</span>
            </div>
          </div>

          <div className="caja-info-despacho" style={{ borderLeftColor: '#e53e3e', marginTop: '2rem' }}>
            <div className="icono-info">⚠️</div>
            <div style={{ width: '100%' }}>
              <h3 style={{ color: '#e53e3e' }}>Alerta de Productos con Stock Crítico</h3>
              {productosCriticos.length === 0 ? (
                <p style={{ color: '#276749', fontWeight: 'bold' }}>¡Excelente! Todos los productos cuentan con suficiente inventario.</p>
              ) : (
                <div style={{ overflowX: 'auto', marginTop: '0.8rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)' }}>
                        <th style={{ padding: '0.5rem' }}>ID</th>
                        <th style={{ padding: '0.5rem' }}>Producto</th>
                        <th style={{ padding: '0.5rem' }}>Categoría</th>
                        <th style={{ padding: '0.5rem' }}>Stock Restante</th>
                        <th style={{ padding: '0.5rem' }}>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosCriticos.map((prod) => (
                        <tr key={prod.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                          <td style={{ padding: '0.5rem' }}>#{prod.id}</td>
                          <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{prod.nombre}</td>
                          <td style={{ padding: '0.5rem' }}>{prod.categoria}</td>
                          <td style={{ padding: '0.5rem', color: '#e53e3e', fontWeight: 'bold' }}>{prod.stock} un.</td>
                          <td style={{ padding: '0.5rem' }}>
                            <button className="boton" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleEditar(prod)}>
                              Reabastecer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {pestana === 'productos' && (
        <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
          <h2 style={{ color: 'var(--color-secundario)', marginBottom: '1rem' }}>Listado General de Inventario</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '0.8rem' }}>ID</th>
                <th style={{ padding: '0.8rem' }}>Imagen</th>
                <th style={{ padding: '0.8rem' }}>Producto</th>
                <th style={{ padding: '0.8rem' }}>Categoría</th>
                <th style={{ padding: '0.8rem' }}>Precio</th>
                <th style={{ padding: '0.8rem' }}>Stock</th>
                <th style={{ padding: '0.8rem' }}>Oferta</th>
                <th style={{ padding: '0.8rem', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => {
                const rutaImg = obtenerRutaImagen(prod);
                return (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '0.8rem' }}>#{prod.id}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <img src={rutaImg} alt={prod.nombre} onError={usarImagenPorDefecto} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    </td>
                    <td style={{ padding: '0.8rem', fontWeight: 'bold', color: 'var(--color-secundario)' }}>{prod.nombre}</td>
                    <td style={{ padding: '0.8rem' }}>{prod.categoria}</td>
                    <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{formatearPrecio(prod.precio)}</td>
                    <td style={{ padding: '0.8rem', color: prod.stock <= 5 ? '#e53e3e' : '#276749', fontWeight: 'bold' }}>
                      {prod.stock} un.
                    </td>
                    <td style={{ padding: '0.8rem' }}>{prod.oferta ? '🔥 Sí' : 'No'}</td>
                    <td style={{ padding: '0.8rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => setProductoDetalle(prod)}
                        style={{ background: '#edf2f7', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.4rem', fontWeight: 'bold' }}
                      >
                        👁️ Detalle
                      </button>
                      {!esVendedor && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEditar(prod)}
                            style={{ background: '#e2e8f0', border: 'none', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.4rem', fontWeight: 'bold' }}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEliminar(prod.id)}
                            style={{ background: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            🗑️ Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {pestana === 'ordenes' && <AdminOrdenes ordenes={ordenes} />}

      {!esVendedor && pestana === 'categorias' && (
        <AdminCategorias
          productos={productos}
          categorias={categoriasDisponibles}
          onAgregarCategoria={handleAgregarCategoria}
        />
      )}

      {!esVendedor && pestana === 'usuarios' && (
        <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: 'var(--color-secundario)', marginBottom: '1rem' }}>Usuarios Registrados ({totalUsuarios})</h2>
          {totalUsuarios === 0 ? (
            <p style={{ color: '#64748b' }}>Aún no hay usuarios registrados en el sistema.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: 'var(--color-secundario)' }}>
                  <th style={{ padding: '0.8rem' }}>Nombre</th>
                  <th style={{ padding: '0.8rem' }}>Correo Electrónico</th>
                  <th style={{ padding: '0.8rem' }}>Rol</th>
                  <th style={{ padding: '0.8rem' }}>Teléfono</th>
                  <th style={{ padding: '0.8rem' }}>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{u.nombre}</td>
                    <td style={{ padding: '0.8rem' }}>{u.email}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <span className="badge-estado">{obtenerRolUsuario(u)}</span>
                    </td>
                    <td style={{ padding: '0.8rem' }}>{u.telefono || 'Sin registro'}</td>
                    <td style={{ padding: '0.8rem' }}>{u.direccion || 'Sin registro'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {!esVendedor && pestana === 'reportes' && (
        <AdminReportes productos={productos} ordenes={ordenes} />
      )}

      {productoDetalle && (
        <div className="modal-pago">
          <div className="contenido-modal" style={{ maxWidth: '480px' }}>
            <div className="cabecera-modal">
              <h2>Detalle de Producto #{productoDetalle.id}</h2>
              <button type="button" className="btn-eliminar" onClick={() => setProductoDetalle(null)}>✕</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <img
                src={obtenerRutaImagen(productoDetalle)}
                alt={productoDetalle.nombre}
                onError={usarImagenPorDefecto}
                style={{ maxHeight: '140px', objectFit: 'contain' }}
              />
            </div>
            <p style={{ margin: '0.4rem 0' }}><strong>Nombre:</strong> {productoDetalle.nombre}</p>
            <p style={{ margin: '0.4rem 0' }}><strong>Categoría:</strong> {productoDetalle.categoria}</p>
            <p style={{ margin: '0.4rem 0' }}><strong>Precio:</strong> {formatearPrecio(productoDetalle.precio)}</p>
            <p style={{ margin: '0.4rem 0' }}><strong>Stock:</strong> {productoDetalle.stock} un.</p>
            <p style={{ margin: '0.4rem 0' }}><strong>Oferta:</strong> {productoDetalle.oferta ? 'Sí' : 'No'}</p>
            <p style={{ margin: '0.4rem 0' }}><strong>Descripción:</strong> {productoDetalle.descripcion || 'Sin descripción'}</p>
          </div>
        </div>
      )}

      {!esVendedor && mostrarModal && (
        <div className="modal-pago">
          <div className="contenido-modal" style={{ maxWidth: '520px' }}>
            <div className="cabecera-modal">
              <h2>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
              <button className="btn-eliminar" onClick={() => setMostrarModal(false)}>✕</button>
            </div>

            <form onSubmit={handleGuardar} className="form-login">
              <div className="grupo-campo">
                <label>Código (opcional)</label>
                <input
                  type="text"
                  maxLength="20"
                  value={formProducto.codigo}
                  onChange={(e) => setFormProducto({ ...formProducto, codigo: e.target.value })}
                  placeholder="ej. CL001"
                />
              </div>

              <div className="grupo-campo">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  required
                  value={formProducto.nombre}
                  onChange={(e) => setFormProducto({ ...formProducto, nombre: e.target.value })}
                  placeholder="ej. Cilindro GLP 15 kg"
                />
              </div>

              <div className="fila-doble-login">
                <div className="grupo-campo">
                  <label>Categoría</label>
                  <select
                    value={formProducto.categoria}
                    onChange={(e) => setFormProducto({ ...formProducto, categoria: e.target.value })}
                    style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    {categoriasDisponibles.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grupo-campo">
                  <label>Precio ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formProducto.precio}
                    onChange={(e) => {
                      const precio = e.target.value;
                      const precioAnterior = Number(formProducto.precioAnterior);
                      const descuento = formProducto.oferta && precioAnterior > Number(precio)
                        ? Math.round((precioAnterior - Number(precio)) * 100 / precioAnterior)
                        : formProducto.oferta ? '' : formProducto.descuento;
                      setFormProducto({ ...formProducto, precio, descuento });
                    }}
                    placeholder="22900"
                  />
                </div>
              </div>

              <div className="fila-doble-login">
                <div className="grupo-campo">
                  <label>Stock Disponible</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formProducto.stock}
                    onChange={(e) => setFormProducto({ ...formProducto, stock: e.target.value })}
                    placeholder="15"
                  />
                </div>

                <div className="grupo-campo">
                  <label>Ruta de la Imagen</label>
                  <input
                    type="text"
                    required
                    value={formProducto.imagen}
                    onChange={(e) => setFormProducto({ ...formProducto, imagen: e.target.value })}
                    placeholder="assets/cilindro15kg.png"
                  />
                </div>
              </div>

              <div className="grupo-campo">
                <label>Descripción</label>
                <textarea
                  rows="3"
                  value={formProducto.descripcion}
                  onChange={(e) => setFormProducto({ ...formProducto, descripcion: e.target.value })}
                  placeholder="Breve detalle del producto..."
                  style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="chk-oferta"
                  checked={formProducto.oferta}
                  onChange={(e) => setFormProducto({ ...formProducto, oferta: e.target.checked })}
                />
                <label htmlFor="chk-oferta" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Marcar como Producto en Oferta 🏷️
                </label>
              </div>

              {formProducto.oferta && (
                <div className="fila-doble-login">
                  <div className="grupo-campo">
                    <label>Precio anterior ($)</label>
                    <input
                      type="number"
                      required
                      min={Number(formProducto.precio || 0) + 1}
                      value={formProducto.precioAnterior}
                      onChange={(e) => {
                        const precioAnterior = e.target.value;
                        const precio = Number(formProducto.precio);
                        const descuento = precioAnterior && Number(precioAnterior) > precio
                          ? Math.round((Number(precioAnterior) - precio) * 100 / Number(precioAnterior))
                          : '';
                        setFormProducto({ ...formProducto, precioAnterior, descuento });
                      }}
                      placeholder="Precio antes de la oferta"
                    />
                  </div>
                  <div className="grupo-campo">
                    <label>Descuento (%)</label>
                    <input type="number" readOnly value={formProducto.descuento} />
                  </div>
                </div>
              )}

              {errorProducto && <p role="alert" style={{ color: '#b91c1c' }}>{errorProducto}</p>}

              <div className="acciones-modal">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="boton" disabled={guardandoProducto}>
                  {guardandoProducto ? 'Guardando…' : modoEdicion ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;

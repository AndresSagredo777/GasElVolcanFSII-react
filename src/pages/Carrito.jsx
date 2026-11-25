import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calcularTotal } from '../utils/carrito';
import { formatearPrecio } from '../utils/precio';
import { obtenerRutaImagen, obtenerStock, usarImagenPorDefecto } from '../utils/funcionesProductos';
import { formularioValido, validarEnvio } from '../utils/validaciones';

function Carrito({
  carrito,
  productos,
  cambiarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  usuarioActual = null,
  crearPedido,
}) {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errorPedido, setErrorPedido] = useState('');
  const [enviandoPedido, setEnviandoPedido] = useState(false);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: usuarioActual?.nombre || '',
    direccion: usuarioActual?.direccion || '',
    comuna: 'Puente Alto',
    telefono: usuarioActual?.telefono || '',
    metodoPago: 'efectivo',
  });

  const [errores, setErrores] = useState({});

  const { subtotal } = calcularTotal(carrito);
  const total = subtotal;

  const abrirModalPago = () => {
    if (usuarioActual) {
      setDatosEnvio((prev) => ({
        ...prev,
        nombre: prev.nombre || usuarioActual.nombre || '',
        direccion: prev.direccion || usuarioActual.direccion || '',
        telefono: prev.telefono || usuarioActual.telefono || '',
      }));
    }
    setMostrarModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    setErrorPedido('');

    if (!usuarioActual) {
      navigate('/login');
      return;
    }

    const nuevosErrores = validarEnvio(datosEnvio);
    setErrores(nuevosErrores);
    if (!formularioValido(nuevosErrores)) return;

    setEnviandoPedido(true);
    try {
      const pedido = await crearPedido({
        nombreDestinatario: datosEnvio.nombre.trim(),
        telefono: datosEnvio.telefono.trim(),
        direccion: [datosEnvio.direccion.trim(), datosEnvio.comuna.trim()].filter(Boolean).join(', '),
        productos: carrito.map((item) => ({
          productoId: Number(item.id),
          cantidad: Number(item.cantidad),
        })),
      });
      vaciarCarrito();
      navigate('/pago-exitoso', { state: { pedido } });
    } catch (error) {
      setErrorPedido(error.message || 'No se pudo registrar el pedido.');
    } finally {
      setEnviandoPedido(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <main className="contenedor-principal text-center py-5">
        <h1>Tu Carrito está vacío</h1>
        <p>Aún no has agregado productos a tu pedido.</p>
        <Link to="/productos" className="boton mt-3">
          Ver Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="contenedor-principal">
      <h1>Tu Pedido de Gas</h1>

      <div className="disposicion-carrito">
        <section className="lista-carrito">
          {carrito.map((item) => {
            const prodStock = obtenerStock(productos, item.id);
            return (
              <article className="item-carrito" key={item.id}>
                <img src={obtenerRutaImagen(item)} alt={item.nombre} onError={usarImagenPorDefecto} />

                <div className="detalles-item">
                  <h3>{item.nombre}</h3>
                  <span className="precio-unitario">
                    {formatearPrecio(item.precio)} c/u
                  </span>
                  <br />
                  <small style={{ color: '#666' }}>Max. disponible: {prodStock} un.</small>
                </div>

                <div className="controles-cantidad">
                  <input
                    type="number"
                    min="1"
                    max={prodStock}
                    step="1"
                    onKeyDown={(e) => {
                      if (['.', ',', '-', '+', 'e'].includes(e.key)) e.preventDefault();
                    }}
                    value={item.cantidad}
                    onChange={(e) => cambiarCantidad(item.id, e.target.value)}
                  />
                </div>

                <div className="subtotal-item">
                  {formatearPrecio(item.precio * item.cantidad)}
                </div>

                <button
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  ✕
                </button>
              </article>
            );
          })}
        </section>

        <aside className="resumen-compra">
          <h2>Resumen del Pedido</h2>

          <div className="fila-resumen">
            <span>Subtotal:</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>El total corresponde a los productos; el despacho y el pago no se procesan en esta aplicación.</p>
<div className="fila-resumen total">
            <span>Total:</span>
            <span>{formatearPrecio(total)}</span>
          </div>

          <button className="boton btn-pagar" onClick={abrirModalPago}>
            Ir a Pagar
          </button>
        </aside>
      </div>

      {mostrarModal && (
        <div className="modal-pago" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <div className="contenido-modal">
            <div className="cabecera-modal">
              <h2>Confirmación de Despacho</h2>
              <span className="badge-seguro">
                {usuarioActual ? `Cliente: ${usuarioActual.nombre}` : 'Inicia sesión para pedir'}
              </span>
            </div>

            <form id="form-pasarela" onSubmit={handleFinalizarCompra} noValidate>
              <fieldset className="seccion-form">
                <legend>Datos de Entrega</legend>

                <label>Nombre Completo:</label>
                <input
                  type="text"
                  name="nombre"
                  value={datosEnvio.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                />
                {errores.nombre && <small style={{ color: '#e53e3e' }}>{errores.nombre}</small>}

                <label>Dirección y Número:</label>
                <input
                  type="text"
                  name="direccion"
                  value={datosEnvio.direccion}
                  onChange={handleInputChange}
                  placeholder="Ej: Av. Concha y Toro 1234"
                />
                {errores.direccion && <small style={{ color: '#e53e3e' }}>{errores.direccion}</small>}

                <div className="fila-doble">
                  <div>
                    <label>Comuna:</label>
                    <input
                      type="text"
                      name="comuna"
                      value={datosEnvio.comuna}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Teléfono Contacto:</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={datosEnvio.telefono}
                      onChange={handleInputChange}
                      placeholder="Ej: 912345678"
                    />
                    {errores.telefono && <small style={{ color: '#e53e3e' }}>{errores.telefono}</small>}
                  </div>
                </div>
              </fieldset>

              <fieldset className="seccion-form">
                <legend>Pago</legend>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Este paso registra el pedido. El pago se coordina fuera de la aplicación.
                </p>
              </fieldset>

              {errorPedido && <p role="alert" className="alerta-error">{errorPedido}</p>}
              <div className="acciones-modal">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="boton" disabled={enviandoPedido}>
                  {enviandoPedido ? 'Enviando pedido...' : 'Confirmar pedido (' + formatearPrecio(total) + ')'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Carrito;
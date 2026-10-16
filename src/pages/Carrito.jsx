import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcularTotal } from '../utils/carrito';
import { formatearPrecio } from '../utils/precio';
import { obtenerRutaImagen, obtenerStock } from '../utils/funcionesProductos';
import { formularioValido, validarEnvio } from '../utils/validaciones';

function Carrito({ carrito, productos, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, descontarStock }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ordenCompletada, setOrdenCompletada] = useState(false);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    direccion: '',
    comuna: 'Puente Alto',
    telefono: '',
    metodoPago: 'efectivo'
  });

  const [errores, setErrores] = useState({});

  const { subtotal, costoEnvio, total } = calcularTotal(carrito);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    const nuevosErrores = validarEnvio(datosEnvio);
    setErrores(nuevosErrores);

    if (!formularioValido(nuevosErrores)) return;

    descontarStock();
    setOrdenCompletada(true);

    descontarStock();
    vaciarCarrito();
    setOrdenCompletada(true);
  };

  if (carrito.length === 0 && !ordenCompletada) {
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

  if (ordenCompletada) {
    return (
      <main className="contenedor-principal text-center py-5">
        <div className="aviso">
          <h2>¡Pedido Confirmado con Éxito! 🎉</h2>
          <p>
            Gracias <strong>{datosEnvio.nombre}</strong>, tu pedido ha sido registrado para entrega en <strong>{datosEnvio.direccion}, {datosEnvio.comuna}</strong>.
          </p>
          <p>El stock ha sido actualizado en el sistema.</p>
        </div>
        <Link to="/" className="boton mt-3" onClick={() => setOrdenCompletada(false)}>
          Volver al Inicio
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
                <img src={obtenerRutaImagen(item)} alt={item.nombre} />
                
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

          <div className="fila-resumen">
            <span>Despacho:</span>
            <span>{formatearPrecio(costoEnvio)}</span>
          </div>

          <div className="fila-resumen total">
            <span>Total:</span>
            <span>{formatearPrecio(total)}</span>
          </div>

          <button className="boton btn-pagar" onClick={() => setMostrarModal(true)}>
            Ir a Pagar
          </button>
        </aside>
      </div>

      {mostrarModal && (
        <div className="modal-pago" style={{ display: 'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
          <div className="contenido-modal">
            <div className="cabecera-modal">
              <h2>Confirmación de Despacho</h2>
              <span className="badge-seguro">🔒 Pago Seguro</span>
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
                <legend>Método de Pago</legend>
                <label>
                  <input 
                    type="radio" 
                    name="metodoPago" 
                    value="efectivo" 
                    checked={datosEnvio.metodoPago === 'efectivo'} 
                    onChange={handleInputChange}
                  /> Efectivo al repartidor
                </label>
                <br />
                <label>
                  <input 
                    type="radio" 
                    name="metodoPago" 
                    value="transbank" 
                    checked={datosEnvio.metodoPago === 'transbank'} 
                    onChange={handleInputChange}
                  /> Tarjeta Débito/Crédito (POS)
                </label>
              </fieldset>

              <div className="acciones-modal">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="boton">
                  Confirmar Pedido ({formatearPrecio(total)})
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
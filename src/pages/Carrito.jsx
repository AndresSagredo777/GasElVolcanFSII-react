import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calcularResumen } from '../utils/carrito';

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

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = subtotal > 0 ? 2000 : 0;
  const total = subtotal + costoEnvio;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEnvio({ ...datosEnvio, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: null });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!datosEnvio.nombre.trim() || datosEnvio.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresa un nombre completo válido.';
    }
    if (!datosEnvio.direccion.trim() || datosEnvio.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'Ingresa una dirección con número.';
    }
    if (!datosEnvio.comuna.trim()) {
      nuevosErrores.comuna = 'Ingresa tu comuna.';
    }
    const regexTel = /^(\+?56)?9\d{8}$/;
    if (!regexTel.test(datosEnvio.telefono.replace(/\s+/g, ''))) {
      nuevosErrores.telefono = 'Teléfono inválido (ej: 912345678).';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    descontarStock();
    setOrdenCompletada(true);

    setTimeout(() => {
      vaciarCarrito();
    }, 1500);
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
            const prodStock = productos.find((p) => p.id === item.id)?.stock || item.stock;
            return (
              <article className="item-carrito" key={item.id}>
                <img src={item.img} alt={item.nombre} />
                
                <div className="detalles-item">
                  <h3>{item.nombre}</h3>
                  <span className="precio-unitario">
                    ${item.precio.toLocaleString('es-CL')} c/u
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
                    onChange={(e) => cambiarCantidad(item.id, parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="subtotal-item">
                  ${(item.precio * item.cantidad).toLocaleString('es-CL')}
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
            <span>${subtotal.toLocaleString('es-CL')}</span>
          </div>

          <div className="fila-resumen">
            <span>Despacho:</span>
            <span>${costoEnvio.toLocaleString('es-CL')}</span>
          </div>

          <div className="fila-resumen total">
            <span>Total:</span>
            <span>${total.toLocaleString('es-CL')}</span>
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
                  Confirmar Pedido (${total.toLocaleString('es-CL')})
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
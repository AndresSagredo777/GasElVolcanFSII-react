import { useState } from 'react';

function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.nombre && form.email && form.mensaje) {
      setEnviado(true);
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    }
  };

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login" style={{ maxWidth: '600px' }}>
        <h1 className="titulo-login">Contacto y Soporte</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>
          ¿Tienes dudas con tu pedido o consulta sobre entregas empresariales?
        </p>

        {enviado && (
          <div className="alerta-error" style={{ backgroundColor: '#c6f6d5', color: '#22543d', borderLeftColor: '#38a169' }}>
            El formulario se validó en esta demostración, pero el mensaje no se envió. Aún no hay un servicio de contacto conectado.
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-login">
          <div className="grupo-campo">
            <label>Nombre Completo</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Juan Pérez"
            />
          </div>

          <div className="grupo-campo">
            <label>Correo Electrónico</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="correo@ejemplo.cl"
            />
          </div>

          <div className="grupo-campo">
            <label>Asunto</label>
            <input
              type="text"
              value={form.asunto}
              onChange={(e) => setForm({ ...form, asunto: e.target.value })}
              placeholder="Consulta sobre reparto"
            />
          </div>

          <div className="grupo-campo">
            <label>Mensaje</label>
            <textarea
              required
              rows="4"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              placeholder="Escribe tu mensaje aquí..."
              style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
            />
          </div>

          <button type="submit" className="boton btn-login-submit">
            Validar Formulario
          </button>
        </form>
      </div>
    </main>
  );
}

export default Contacto;

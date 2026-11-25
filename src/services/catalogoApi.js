const CATALOGO_URL = import.meta.env.VITE_CATALOGO_API_URL;

async function solicitar(ruta, opciones = {}) {
  const token = sessionStorage.getItem('token');
  const headers = { ...(opciones.headers || {}) };
  if (opciones.body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = 'Bearer ' + token;

  const respuesta = await fetch(CATALOGO_URL + ruta, { ...opciones, headers });
  const texto = await respuesta.text();
  let resultado = null;
  if (texto) {
    try { resultado = JSON.parse(texto); } catch { resultado = { error: texto }; }
  }

  if (!respuesta.ok) {
    throw new Error(resultado?.error || 'Error HTTP ' + respuesta.status);
  }
  return resultado;
}

export function listarProductosAPI() {
  return solicitar('/api/productos');
}

export function guardarProductoAPI(producto, id = null) {
  return solicitar(id == null ? '/api/productos' : `/api/productos/${id}`, {
    method: id == null ? 'POST' : 'PUT',
    body: JSON.stringify(producto),
  });
}

export function eliminarProductoAPI(id) {
  return solicitar(`/api/productos/${id}`, { method: 'DELETE' });
}

export function crearPedidoAPI(pedido) {
  return solicitar('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(pedido),
  });
}

export function listarMisPedidosAPI() {
  return solicitar('/api/pedidos/mis-pedidos');
}

export function listarTodosPedidosAPI() {
  return solicitar('/api/pedidos');
}

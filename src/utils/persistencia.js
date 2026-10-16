export const claves = {
  productos: "productosStock",
  carrito: "carritoProductos",
  usuarios: "usuariosGas",
  usuarioActual: "usuarioActualGas",
};

export function leerDatos(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

export function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

export function eliminarDatos(clave) {
  localStorage.removeItem(clave);
}
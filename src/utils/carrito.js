import {obtenerStock} from "./funcionesProductos"

export const costo_envio = 2000;

export function calcularCantidadTotal(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

export function calcularTotal(carrito) {
  const subtotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  const costoEnvio = subtotal > 0 ? costo_envio : 0;
  return { subtotal, costoEnvio, total: subtotal + costoEnvio };
}

export function validarAgregar(producto, productos, carrito) {
  const stock = obtenerStock(productos, producto.id);
  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  if (stock <= 0) {
    return { valido: false, mensaje: `¡El producto ${producto.nombre} está agotado!` };
  }
  if (cantidadActual + 1 > stock) {
    return {
      valido: false,
      mensaje: `Solo quedan ${stock} unidades disponibles de ${producto.nombre}.`,
    };
  }
  return { valido: true, mensaje: "" };
}

export function agregarProducto(carrito, producto) {
  const yaExiste = carrito.some((item) => item.id === producto.id);

  if (yaExiste) {
    return carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
  }
  return [...carrito, { ...producto, cantidad: 1 }];
}

export function eliminarProducto(carrito, id) {
  return carrito.filter((item) => item.id !== id);
}

export function actualizarCantidad(carrito, id, nuevaCantidad, stock) {
  const entero = Math.floor(Number(nuevaCantidad));
  const cantidad = Math.min(entero >= 1 ? entero : 1, stock);

  if (cantidad <= 0) return eliminarProducto(carrito, id);

  return carrito.map((item) => (item.id === id ? { ...item, cantidad } : item));
}

export function descontarStock(productos, carrito) {
  return productos.map((producto) => {
    const comprado = carrito.find((item) => item.id === producto.id);
    if (!comprado) return producto;
    return { ...producto, stock: Math.max(producto.stock - comprado.cantidad, 0) };
  });
}
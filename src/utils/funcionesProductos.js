export function combinarConStockGuardado(iniciales, guardados) {
  return iniciales.map((producto) => {
    const guardado = guardados.find((item) => item.id === producto.id);
    return guardado ? { ...producto, stock: guardado.stock } : producto;
  });
}

export function obtenerStock(productos, id) {
  const producto = productos.find((item) => item.id === id);
  return producto ? producto.stock : 0;
}   

export function obtenerCategorias(productos) {
  const nombres = productos.map((producto) => producto.categoria);
  return ["todas", ...new Set(nombres)];
}

export function filtrarPorCategoria(productos, categoria) {
  if (categoria === "todas") return productos;
  return productos.filter((producto) => producto.categoria === categoria);
}

export function obtenerDestacados(productos, cantidad = 4) {
  return productos.slice(0, cantidad);
}

export function obtenerRutaImagen(producto) {
  if (!producto.imagen) return "/assets/cilindro11kg.png";
  return producto.imagen.startsWith("/") ? producto.imagen : `/${producto.imagen}`;
}

export function describirStock(stock) {
  return stock > 0 ? `Stock disponible: ${stock} un.` : "Agotado";
}
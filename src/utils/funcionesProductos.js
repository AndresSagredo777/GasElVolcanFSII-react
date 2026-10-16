export const default_img = "/assets/cilindro11kg.png"

export function buscarProductoPorId(productos, id) {
  return productos.find((producto) => producto.id === Number(id));
}

export function combinarConStockGuardado(iniciales, guardados) {
  return iniciales.map((producto) => {
    const guardado = guardados.find((item) => item.id === producto.id);
    return guardado ? { ...producto, stock: guardado.stock } : producto;
  });
}

export function obtenerStock(productos, id) {
  const producto = buscarProductoPorId(productos, id);
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

export function filtrarOfertas(productos) {
  return productos.filter((producto) => producto.oferta === true);
}

export function obtenerDestacados(productos, cantidad = 4) {
  return productos.slice(0, cantidad);
}

export function obtenerRutaImagen(producto) {
  if (!producto.imagen) return default_img;
  return producto.imagen.startsWith("/") ? producto.imagen : `/${producto.imagen}`;
}

export function usarImagenPorDefecto(evento) {
  evento.target.onerror = null;
  evento.target.src = default_img;
}

export function describirStock(stock) {
  return stock > 0 ? `Stock disponible: ${stock} un.` : "Agotado";
}

export function textoOferta(producto) {
  return producto.descuento ? `${producto.descuento}% OFF` : "En Oferta";
}

export function crearProducto(productos, datos) {
  const idNuevo = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
  return [...productos, { id: idNuevo, ...datos }];
}

export function editarProducto(productos, id, datos) {
  return productos.map((producto) =>
    producto.id === Number(id) ? { ...producto, ...datos } : producto
  );
}

export function borrarProducto(productos, id) {
  return productos.filter((producto) => producto.id !== Number(id));
}

export function normalizarProducto(formulario) {
  return {
    ...formulario,
    precio: Math.max(0, Math.floor(Number(formulario.precio)) || 0),
    stock: Math.max(0, Math.floor(Number(formulario.stock)) || 0),
  };
}

export function obtenerStockCritico(productos, limite = 5) {
  return productos.filter((producto) => Number(producto.stock) <= limite);
}

export function contarCategorias(productos) {
  return new Set(productos.map((producto) => producto.categoria)).size;
}
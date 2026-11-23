export function generarNumeroOrden() {
  return `#2026${Math.floor(1000 + Math.random() * 9000)}`;
}

export function crearOrden({ cliente, items, total }) {
  return {
    id: Date.now(),
    numero: generarNumeroOrden(),
    fecha: new Date().toLocaleDateString('es-CL'),
    cliente,
    items: items.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio,
    })),
    total,
    estado: 'Confirmado',
  };
}
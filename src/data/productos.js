export const productos = [
  { id: 1, nombre: 'Cilindro de Gas 5 kg', categoria: 'Cilindros de Gas', precio: 10800, stock: 15, oferta: false, imagen: 'assets/cilindro5kg.jpg', descripcion: 'Para uso residencial (cocina o calefacción pequeña).' },
  { id: 2, nombre: 'Cilindro de Gas 11 kg', categoria: 'Cilindros de Gas', precio: 17500, stock: 20, oferta: true, imagen: 'assets/cilindro11kg.png', descripcion: 'Ideal para estufas a gas y cocinas de tamaño estándar.' },
  { id: 3, nombre: 'Cilindro de Gas 15 kg', categoria: 'Cilindros de Gas', precio: 22900, stock: 12, oferta: false, imagen: 'assets/cilindro15kg.png', descripcion: 'Mayor capacidad para hogares de alto consumo.' },
  { id: 4, nombre: 'Cilindro de Gas 45 kg', categoria: 'Cilindros de Gas', precio: 65000, stock: 8, oferta: true, imagen: 'assets/cilindro45kg.png', descripcion: 'Gran capacidad para calefacción central y comercios.' },
  { id: 5, nombre: 'Regulador Doméstico', categoria: 'Accesorios y Reguladores', precio: 8900, stock: 25, oferta: false, imagen: 'assets/reguladordomestico.png', descripcion: 'Regulador de presión para cilindros residenciales.' },
  { id: 6, nombre: 'Regulador Alta Presión', categoria: 'Accesorios y Reguladores', precio: 12500, stock: 10, oferta: false, imagen: 'assets/reguladoraltapresion.png', descripcion: 'Para artefactos comerciales e industriales.' },
  { id: 7, nombre: 'Regulador Dual', categoria: 'Accesorios y Reguladores', precio: 18900, stock: 5, oferta: true, imagen: 'assets/reguladordual.png', descripcion: 'Conexión simultánea para dos cilindros.' },
  { id: 8, nombre: 'Manguera Gas 1 metro', categoria: 'Accesorios y Reguladores', precio: 3500, stock: 30, oferta: false, imagen: 'assets/mangueragas1.png', descripcion: 'Manguera de alta resistencia normada por la SEC.' },
  { id: 9, nombre: 'Manguera Gas 3 metros', categoria: 'Accesorios y Reguladores', precio: 7900, stock: 18, oferta: false, imagen: 'assets/mangueragas3.png', descripcion: 'Manguera extendida reforzada.' },
  { id: 10, nombre: 'Abrazadera Metálica', categoria: 'Accesorios y Reguladores', precio: 1200, stock: 50, oferta: false, imagen: 'assets/abrazaderametalica.png', descripcion: 'Ajuste seguro para mangueras de gas.' },
  { id: 11, nombre: 'Kit Conexión Completo', categoria: 'Accesorios y Reguladores', precio: 14900, stock: 14, oferta: true, imagen: 'assets/kitcompleto.png', descripcion: 'Incluye regulador, manguera y abrazaderas.' },
  { id: 12, nombre: 'Carro para Cilindro', categoria: 'Accesorios y Reguladores', precio: 24900, stock: 6, oferta: false, imagen: 'assets/carrocilindro.png', descripcion: 'Carro de transporte reforzado con ruedas.' },
  { id: 13, nombre: 'Tapa Protectora', categoria: 'Accesorios y Reguladores', precio: 2500, stock: 40, oferta: false, imagen: 'assets/tapaprotectora.png', descripcion: 'Protector de válvula de seguridad.' },
  { id: 14, nombre: 'Detector de Gas a Batería', categoria: 'Accesorios y Reguladores', precio: 19900, stock: 9, oferta: true, imagen: 'assets/detectorgas.png', descripcion: 'Alarma sonora y visual ante fugas de gas.' }
];


export function obtenerProductos() {
  const guardados = localStorage.getItem('productosStock');
  return guardados ? JSON.parse(guardados) : productos;
}

export function crearProducto(nuevoProd) {
  const lista = obtenerProductos();
  const idNuevo = lista.length > 0 ? Math.max(...lista.map(p => p.id)) + 1 : 1;
  const productoCreado = { id: idNuevo, ...nuevoProd };
  const nuevaLista = [...lista, productoCreado];
  localStorage.setItem('productosStock', JSON.stringify(nuevaLista));
  return nuevaLista;
}

export function actualizarProducto(id, datosActualizados) {
  const lista = obtenerProductos();
  const nuevaLista = lista.map(p => p.id === Number(id) ? { ...p, ...datosActualizados } : p);
  localStorage.setItem('productosStock', JSON.stringify(nuevaLista));
  return nuevaLista;
}

export function eliminarProducto(id) {
  const lista = obtenerProductos();
  const nuevaLista = lista.filter(p => p.id !== Number(id));
  localStorage.setItem('productosStock', JSON.stringify(nuevaLista));
  return nuevaLista;
}
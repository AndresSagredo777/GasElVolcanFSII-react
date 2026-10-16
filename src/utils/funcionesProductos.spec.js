import { describe, expect, it, vi } from 'vitest';
import {
  default_img,
  buscarProductoPorId,
  combinarConStockGuardado,
  obtenerStock,
  obtenerCategorias,
  filtrarPorCategoria,
  filtrarOfertas,
  obtenerDestacados,
  obtenerRutaImagen,
  usarImagenPorDefecto,
  describirStock,
  textoOferta,
  crearProducto,
  editarProducto,
  borrarProducto,
  normalizarProducto,
  obtenerStockCritico,
  contarCategorias,
} from './funcionesProductos';

const productos = [
  { id: 1, categoria: 'Gas', stock: 2, imagen: '/gas.png', oferta: true, descuento: 10 },
  { id: 2, categoria: 'Accesorios', stock: 8, imagen: 'regulador.png', oferta: false },
];

describe('funciones de productos', () => {
  it('busca productos por id y reporta stock cero para los que no existen', () => {
    expect(buscarProductoPorId(productos, '1')).toBe(productos[0]);
    expect(buscarProductoPorId(productos, 99)).toBeUndefined();
    expect(obtenerStock(productos, 2)).toBe(8);
    expect(obtenerStock(productos, 99)).toBe(0);
  });

  it('combina el stock guardado sin modificar la lista inicial', () => {
    const resultado = combinarConStockGuardado(productos, [{ id: 1, stock: 4 }]);
    expect(resultado).toEqual([{ ...productos[0], stock: 4 }, productos[1]]);
    expect(productos[0].stock).toBe(2);
  });

  it('obtiene categorías únicas y filtra por categoría o todas', () => {
    expect(obtenerCategorias(productos)).toEqual(['todas', 'Gas', 'Accesorios']);
    expect(filtrarPorCategoria(productos, 'Gas')).toEqual([productos[0]]);
    expect(filtrarPorCategoria(productos, 'todas')).toBe(productos);
  });

  it('filtra ofertas y devuelve destacados según el límite solicitado', () => {
    expect(filtrarOfertas(productos)).toEqual([productos[0]]);
    expect(obtenerDestacados(productos, 1)).toEqual([productos[0]]);
    expect(obtenerDestacados(productos)).toEqual(productos);
  });

  it('resuelve rutas de imagen y restablece la imagen predeterminada ante un error', () => {
    expect(obtenerRutaImagen(productos[0])).toBe('/gas.png');
    expect(obtenerRutaImagen(productos[1])).toBe('/regulador.png');
    expect(obtenerRutaImagen({})).toBe(default_img);

    const evento = { target: { onerror: vi.fn(), src: '/rota.png' } };
    usarImagenPorDefecto(evento);
    expect(evento.target.onerror).toBeNull();
    expect(evento.target.src).toBe(default_img);
  });

  it('describe stock y muestra el descuento cuando corresponde', () => {
    expect(describirStock(3)).toBe('Stock disponible: 3 un.');
    expect(describirStock(0)).toBe('Agotado');
    expect(textoOferta(productos[0])).toBe('10% OFF');
    expect(textoOferta(productos[1])).toBe('En Oferta');
  });

  it('crea, edita y elimina productos sin mutar los datos recibidos', () => {
    expect(crearProducto([], { nombre: 'Nuevo' })).toEqual([{ id: 1, nombre: 'Nuevo' }]);
    const editados = editarProducto(productos, '2', { stock: 6 });
    expect(editados[1].stock).toBe(6);
    expect(editados[0]).toBe(productos[0]);
    expect(productos[1].stock).toBe(8);
    expect(borrarProducto(productos, 1)).toEqual([productos[1]]);
  });

  it('normaliza precio y stock a enteros no negativos', () => {
    expect(normalizarProducto({ precio: '100.9', stock: '-2' })).toEqual({ precio: 100, stock: 0 });
    expect(normalizarProducto({ precio: 'inválido', stock: '3.8' })).toEqual({ precio: 0, stock: 3 });
  });

  it('identifica stock crítico y cuenta las categorías distintas', () => {
    expect(obtenerStockCritico(productos)).toEqual([productos[0]]);
    expect(obtenerStockCritico(productos, 8)).toEqual(productos);
    expect(contarCategorias(productos)).toBe(2);
    expect(contarCategorias([])).toBe(0);
  });
});

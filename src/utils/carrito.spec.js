import {
  actualizarCantidad,
  agregarProducto,
  calcularCantidadTotal,
  calcularTotal,
  costo_envio,
  descontarStock,
  eliminarProducto,
  validarAgregar,
} from './carrito';

const cilindro = { id: 1, nombre: 'Cilindro', precio: 1000, stock: 5 };
const regulador = { id: 2, nombre: 'Regulador', precio: 500, stock: 2 };

describe('calcularCantidadTotal', () => {
  it('suma las cantidades de todos los items', () => {
    const carrito = [{ ...cilindro, cantidad: 2 }, { ...regulador, cantidad: 3 }];
    expect(calcularCantidadTotal(carrito)).toBe(5);
  });

  it('devuelve 0 con el carrito vacío', () => {
    expect(calcularCantidadTotal([])).toBe(0);
  });
});

it('acepta solo enteros positivos y no pasa del stock', () => {
  const carrito = [{ ...cilindro, cantidad: 1 }];
  expect(actualizarCantidad(carrito, 1, 99, 5)[0].cantidad).toBe(5);
  expect(actualizarCantidad(carrito, 1, 2.7, 5)[0].cantidad).toBe(2);
  expect(actualizarCantidad(carrito, 1, -3, 5)[0].cantidad).toBe(1);
});

describe('calcularTotal', () => {
  it('calcula subtotal, despacho y total', () => {
    const carrito = [{ ...cilindro, cantidad: 2 }, { ...regulador, cantidad: 1 }];
    expect(calcularTotal(carrito)).toEqual({
      subtotal: 2500,
      costoEnvio: costo_envio,
      total: 2500 + costo_envio,
    });
  });

  it('no cobra despacho si el carrito está vacío', () => {
    expect(calcularTotal([])).toEqual({ subtotal: 0, costoEnvio: 0, total: 0 });
  });
});

describe('validarAgregar', () => {
  it('permite agregar si hay stock', () => {
    expect(validarAgregar(cilindro, [cilindro], []).valido).toBe(true);
  });

  it('rechaza un producto agotado', () => {
    const agotado = { ...cilindro, stock: 0 };
    const resultado = validarAgregar(agotado, [agotado], []);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain('agotado');
  });

  it('rechaza si el carrito ya tiene todo el stock', () => {
    const carrito = [{ ...regulador, cantidad: 2 }];
    const resultado = validarAgregar(regulador, [regulador], carrito);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain('Solo quedan 2');
  });
});

describe('agregarProducto', () => {
  it('agrega un producto nuevo con cantidad 1', () => {
    const resultado = agregarProducto([], cilindro);
    expect(resultado).toEqual([{ ...cilindro, cantidad: 1 }]);
  });

  it('suma 1 si el producto ya estaba', () => {
    const carrito = [{ ...cilindro, cantidad: 1 }];
    expect(agregarProducto(carrito, cilindro)[0].cantidad).toBe(2);
  });

  it('no modifica el carrito original (inmutabilidad)', () => {
    const carrito = [{ ...cilindro, cantidad: 1 }];
    agregarProducto(carrito, cilindro);
    expect(carrito[0].cantidad).toBe(1);
  });
});

describe('eliminarProducto', () => {
  it('quita solo el producto indicado', () => {
    const carrito = [{ ...cilindro, cantidad: 1 }, { ...regulador, cantidad: 1 }];
    expect(eliminarProducto(carrito, 1).map((i) => i.id)).toEqual([2]);
  });
});

describe('actualizarCantidad', () => {
  const carrito = [{ ...cilindro, cantidad: 1 }];

  it('cambia la cantidad', () => {
    expect(actualizarCantidad(carrito, 1, 3, 5)[0].cantidad).toBe(3);
  });

  it('no pasa del stock disponible', () => {
    expect(actualizarCantidad(carrito, 1, 99, 5)[0].cantidad).toBe(5);
  });

  it('usa 1 si el valor no es un número', () => {
    expect(actualizarCantidad(carrito, 1, 'abc', 5)[0].cantidad).toBe(1);
  });

  it('elimina el producto si no hay stock', () => {
    expect(actualizarCantidad(carrito, 1, 2, 0)).toEqual([]);
  });
});

describe('descontarStock', () => {
  it('resta lo comprado del stock', () => {
    const carrito = [{ ...cilindro, cantidad: 2 }];
    const resultado = descontarStock([cilindro, regulador], carrito);
    expect(resultado[0].stock).toBe(3);
    expect(resultado[1].stock).toBe(2);
  });

  it('nunca deja stock negativo', () => {
    const carrito = [{ ...regulador, cantidad: 10 }];
    expect(descontarStock([regulador], carrito)[0].stock).toBe(0);
  });
});


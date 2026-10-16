import { vi } from 'vitest';
import { claves, eliminarDatos, guardarDatos, leerDatos } from './persistencia';

describe('persistencia', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('guarda el dato serializado usando setItem', () => {
    const espia = vi.spyOn(Storage.prototype, 'setItem');
    const datos = [{ id: 1, nombre: 'Cilindro' }];

    guardarDatos(claves.carrito, datos);

    expect(espia).toHaveBeenCalledWith(claves.carrito, JSON.stringify(datos));
    espia.mockRestore();
  });

  it('lee lo que se guardó', () => {
    guardarDatos('prueba', { a: 1 });
    expect(leerDatos('prueba', null)).toEqual({ a: 1 });
  });

  it('devuelve el valor por defecto si la clave no existe', () => {
    expect(leerDatos('no-existe', [])).toEqual([]);
  });

  it('devuelve el valor por defecto si el texto guardado está dañado', () => {
    localStorage.setItem('dañado', '{esto no es json');
    expect(leerDatos('dañado', 'respaldo')).toBe('respaldo');
  });

  it('elimina una clave guardada', () => {
    guardarDatos('temporal', 1);
    eliminarDatos('temporal');
    expect(leerDatos('temporal', null)).toBeNull();
  });
});
import { describe, expect, it } from 'vitest';
import { apiMock } from './apiMock';

describe('apiMock (Simulación REST y JWT)', () => {
  it('obtiene el listado de productos simulados', async () => {
    const lista = await apiMock.obtenerProductos();
    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBeGreaterThan(0);
  });

  it('autentica un usuario válido y devuelve un token JWT con su rol', async () => {
    const respuesta = await apiMock.loginMock('admin@gaselvolcan.cl', 'admin123');
    expect(respuesta.token).toContain('mock-jwt-admin-');
    expect(respuesta.usuario.rol).toBe('admin');
    expect(respuesta.usuario).not.toHaveProperty('password');
  });

  it('rechaza credenciales incorrectas', async () => {
    await expect(apiMock.loginMock('admin@gaselvolcan.cl', 'clave-mala')).rejects.toThrow(
      'Credenciales inválidas'
    );
  });

  it('registra una orden simulada', async () => {
    const ordenPrueba = { numero: '#20265555', total: 13000 };
    const respuesta = await apiMock.registrarOrdenMock(ordenPrueba);
    expect(respuesta.orden).toEqual(ordenPrueba);
  });
});
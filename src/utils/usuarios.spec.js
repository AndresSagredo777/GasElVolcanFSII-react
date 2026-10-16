import {
  buscarUsuario,
  crearUsuario,
  obtenerPrimerNombre,
  registrarNuevoUsuario,
} from './usuarios';

const ana = { nombre: 'Ana Soto', email: 'ana@correo.cl', password: '123456' };

describe('registrarNuevoUsuario', () => {
  it('agrega un usuario nuevo a la lista', () => {
    const resultado = registrarNuevoUsuario([], ana);
    expect(resultado.exito).toBe(true);
    expect(resultado.usuarios).toEqual([ana]);
  });

  it('rechaza un correo repetido sin distinguir mayúsculas', () => {
    const repetido = { ...ana, email: 'ANA@correo.cl' };
    const resultado = registrarNuevoUsuario([ana], repetido);
    expect(resultado.exito).toBe(false);
    expect(resultado.usuarios).toEqual([ana]);
  });
});

describe('buscarUsuario', () => {
  it('encuentra con correo y contraseña correctos', () => {
    expect(buscarUsuario([ana], 'ana@correo.cl', '123456')).toEqual(ana);
  });

  it('devuelve undefined con contraseña incorrecta', () => {
    expect(buscarUsuario([ana], 'ana@correo.cl', 'otra')).toBeUndefined();
  });
});

describe('crearUsuario', () => {
  it('no incluye confirmarPassword', () => {
    const usuario = crearUsuario({ ...ana, telefono: '', direccion: '', confirmarPassword: '123456' });
    expect(usuario).not.toHaveProperty('confirmarPassword');
  });
});

describe('obtenerPrimerNombre', () => {
  it('devuelve solo el primer nombre', () => {
    expect(obtenerPrimerNombre(ana)).toBe('Ana');
  });
});
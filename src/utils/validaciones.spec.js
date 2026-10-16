import {
  esEmailValido,
  esTelefonoValido,
  formularioValido,
  validarEnvio,
  validarLogin,
  validarRegistro,
} from './validaciones';

describe('esEmailValido', () => {
  it('acepta un correo correcto', () => {
    expect(esEmailValido('juan@gmail.com')).toBe(true);
  });

  it('rechaza un correo sin @', () => {
    expect(esEmailValido('juangmail.com')).toBe(false);
  });
});

describe('esTelefonoValido', () => {
  it('acepta 9 dígitos empezando en 9', () => {
    expect(esTelefonoValido('912345678')).toBe(true);
  });

  it('acepta el prefijo +56 y espacios', () => {
    expect(esTelefonoValido('+56 9 1234 5678')).toBe(true);
  });

  it('rechaza un número corto', () => {
    expect(esTelefonoValido('12345')).toBe(false);
  });
});

describe('validarLogin', () => {
  it('pide correo y contraseña si faltan', () => {
    expect(validarLogin({ email: '', password: '' })).not.toBe('');
  });

  it('no devuelve error si están completos', () => {
    expect(validarLogin({ email: 'a@b.cl', password: 'x' })).toBe('');
  });
});

describe('validarRegistro', () => {
  const valido = {
    nombre: 'Ana Soto',
    email: 'ana@correo.cl',
    password: '123456',
    confirmarPassword: '123456',
  };

  it('acepta datos correctos', () => {
    expect(validarRegistro(valido)).toBe('');
  });

  it('rechaza una contraseña corta', () => {
    const error = validarRegistro({ ...valido, password: '123', confirmarPassword: '123' });
    expect(error).toContain('6 caracteres');
  });

  it('rechaza contraseñas distintas', () => {
    const error = validarRegistro({ ...valido, confirmarPassword: 'otra' });
    expect(error).toContain('no coinciden');
  });
});

describe('validarEnvio', () => {
  const valido = {
    nombre: 'Juan Pérez',
    direccion: 'Av. Concha y Toro 1234',
    comuna: 'Puente Alto',
    telefono: '912345678',
  };

  it('no devuelve errores con datos correctos', () => {
    expect(formularioValido(validarEnvio(valido))).toBe(true);
  });

  it('devuelve un error por cada campo inválido', () => {
    const errores = validarEnvio({ nombre: '', direccion: '', comuna: '', telefono: '1' });
    expect(Object.keys(errores)).toEqual(['nombre', 'direccion', 'comuna', 'telefono']);
  });
});

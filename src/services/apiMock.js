import { productos as productosMock } from '../data/productos';
import { buscarUsuario, obtenerRolUsuario, usuariosDemo } from '../utils/usuarios';

const simularRetardo = (respuesta, ms = 120) =>
  new Promise((resolve) => setTimeout(() => resolve(respuesta), ms));

export const apiMock = {
  // GET /api/v1/productos
  obtenerProductos: () => simularRetardo([...productosMock]),

  // POST /api/v1/auth/login (Simula respuesta JWT de Spring Security)
  loginMock: (email, password, listaUsuarios = usuariosDemo) => {
    const usuario = buscarUsuario(listaUsuarios, email, password);
    if (!usuario) {
      return Promise.reject(new Error('Credenciales inválidas'));
    }
    const { password: _, ...usuarioSinClave } = usuario;
    return simularRetardo({
      token: `mock-jwt-${obtenerRolUsuario(usuario)}-${Date.now()}`,
      usuario: { ...usuarioSinClave, rol: obtenerRolUsuario(usuario) },
    });
  },

  // POST /api/v1/ordenes
  registrarOrdenMock: (orden) =>
    simularRetardo({
      mensaje: 'Orden registrada en mock API',
      orden,
    }),
};
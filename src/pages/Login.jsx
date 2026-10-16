import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuario } from '../utils/usuarios';
import { validarLogin, validarRegistro } from '../utils/validaciones';

function Login({ iniciarSesion, registrarUsuario, usuarioActual }) {
  const navigate = useNavigate();
  const [esRegistro, setEsRegistro] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState('');

  const [formLogin, setFormLogin] = useState({ email: '', password: '' });
  const [formRegistro, setFormRegistro] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    confirmarPassword: ''
  });

  if (usuarioActual) {
    return (
      <main className="contenedor-principal text-center py-5">
        <div className="aviso">
          <h2>¡Sesión Activa!</h2>
          <p>Hola <strong>{usuarioActual.nombre}</strong>, ya estás conectado en el sistema.</p>
        </div>
        <button className="boton mt-3" onClick={() => navigate('/')}>
          Ir al Inicio
        </button>
      </main>
    );
  }

  const handleLoginChange = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
    setErrorGlobal('');
  };

  const handleRegistroChange = (e) => {
    setFormRegistro({ ...formRegistro, [e.target.name]: e.target.value });
    setErrorGlobal('');
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    
    const error = validarLogin(formLogin)
    
    if (error) {
      setErrorGlobal(error);
      return;
    }

    const resultado = iniciarSesion(formLogin.email, formLogin.password);
    if (resultado.exito) {
      navigate('/carrito');
    } else {
      setErrorGlobal(resultado.mensaje);
    }
  };

  const handleSubmitRegistro = (e) => {
    e.preventDefault();

    const error = validarRegistro(formRegistro);
    
    if (error) {
      setErrorGlobal(error);
      return;
    }

    const resultado = registrarUsuario(crearUsuario(nuevoUsuario));
    if (resultado.exito) {
      navigate('/carrito');
    } else {
      setErrorGlobal(resultado.mensaje);
    }
  };

  return (
    <main className="contenedor-principal">
      <div className="tarjeta-login">
        <h1 className="titulo-login">Acceso a Clientes</h1>

        <div className="pestanas-login">
          <button
            type="button"
            className={`btn-pestana ${!esRegistro ? 'activa' : ''}`}
            onClick={() => { setEsRegistro(false); setErrorGlobal(''); }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`btn-pestana ${esRegistro ? 'activa' : ''}`}
            onClick={() => { setEsRegistro(true); setErrorGlobal(''); }}
          >
            Crear Cuenta
          </button>
        </div>

        {errorGlobal && (
          <div className="alerta-error">
            {errorGlobal}
          </div>
        )}

        {!esRegistro ? (
          <form onSubmit={handleSubmitLogin} className="form-login">
            <div className="grupo-campo">
              <label htmlFor="login-email">Correo Electrónico</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={formLogin.email}
                onChange={handleLoginChange}
                placeholder="ejemplo@correo.cl"
                required
              />
            </div>

            <div className="grupo-campo">
              <label htmlFor="login-pass">Contraseña</label>
              <input
                type="password"
                id="login-pass"
                name="password"
                value={formLogin.password}
                onChange={handleLoginChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="boton btn-login-submit">
              Ingresar
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitRegistro} className="form-login">
            <div className="grupo-campo">
              <label htmlFor="reg-nombre">Nombre Completo</label>
              <input
                type="text"
                id="reg-nombre"
                name="nombre"
                value={formRegistro.nombre}
                onChange={handleRegistroChange}
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div className="grupo-campo">
              <label htmlFor="reg-email">Correo Electrónico</label>
              <input
                type="email"
                id="reg-email"
                name="email"
                value={formRegistro.email}
                onChange={handleRegistroChange}
                placeholder="juan.perez@gmail.com"
                required
              />
            </div>

            <div className="fila-doble-login">
              <div className="grupo-campo">
                <label htmlFor="reg-tel">Teléfono</label>
                <input
                  type="tel"
                  id="reg-tel"
                  name="telefono"
                  value={formRegistro.telefono}
                  onChange={handleRegistroChange}
                  placeholder="912345678"
                />
              </div>
              <div className="grupo-campo">
                <label htmlFor="reg-dir">Dirección</label>
                <input
                  type="text"
                  id="reg-dir"
                  name="direccion"
                  value={formRegistro.direccion}
                  onChange={handleRegistroChange}
                  placeholder="Av. Concha y Toro 123"
                />
              </div>
            </div>

            <div className="fila-doble-login">
              <div className="grupo-campo">
                <label htmlFor="reg-pass">Contraseña</label>
                <input
                  type="password"
                  id="reg-pass"
                  name="password"
                  value={formRegistro.password}
                  onChange={handleRegistroChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="grupo-campo">
                <label htmlFor="reg-conf">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="reg-conf"
                  name="confirmarPassword"
                  value={formRegistro.confirmarPassword}
                  onChange={handleRegistroChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="boton btn-login-submit">
              Registrarse y Entrar
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Login;
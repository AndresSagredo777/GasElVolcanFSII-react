import { useState, useEffect } from 'react';
import './App.css';
import { iniciarSesionAPI, registrarUsuarioAPI } from './services/authApi';
import { crearPedidoAPI, listarMisPedidosAPI, listarProductosAPI, listarTodosPedidosAPI } from './services/catalogoApi';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion';
import Footer from './components/Footer';
import PagPrincipal from './pages/PagPrincipal';
import Nosotros from './pages/Nosotros';
import Cobertura from './pages/Cobertura';
import Cartelera from './pages/CarteleraProductos';
import DetalleProducto from './pages/DetalleProducto';
import Ofertas from './pages/Ofertas';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import DetalleBlog from './pages/DetalleBlog';
import Carrito from './pages/Carrito';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import NotFound404 from './pages/NotFound404';
import { claves, leerDatos, guardarDatos, eliminarDatos } from './utils/persistencia';
import { obtenerStock } from './utils/funcionesProductos';
import {
  agregarProducto,
  actualizarCantidad,
  calcularCantidadTotal,
  calcularTotal,
  eliminarProducto,
  validarAgregar,
} from './utils/carrito';
import { obtenerRolUsuario, usuariosDemo } from './utils/usuarios';

function App() {
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState('');
  const [carrito, setCarrito] = useState(() => leerDatos(claves.carrito, []));
  const [ordenes, setOrdenes] = useState([]);
  const [errorPedidos, setErrorPedidos] = useState('');
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = leerDatos(claves.usuarios, []);
    const extras = guardados.filter(
      (g) => !usuariosDemo.some((d) => d.email.toLowerCase() === g.email?.toLowerCase())
    );
    return [...usuariosDemo, ...extras];
  });
  const [usuarioActual, setUsuarioActual] = useState(() =>
    sessionStorage.getItem('token') ? leerDatos(claves.usuarioActual, null) : null
  );

  useEffect(() => {
    let activo = true;
    listarProductosAPI()
      .then((datos) => {
        if (!activo) return;
        setProductos(datos);
        setCarrito((actual) => actual.flatMap((item) => {
          const producto = datos.find((p) => p.id === item.id);
          if (!producto || producto.stock < 1) return [];
          return [{ ...producto, cantidad: Math.min(item.cantidad, producto.stock) }];
        }));
        setErrorProductos('');
      })
      .catch((error) => {
        if (activo) setErrorProductos(error.message);
      })
      .finally(() => {
        if (activo) setCargandoProductos(false);
      });
    return () => { activo = false; };
  }, []);

  useEffect(() => {
    if (!usuarioActual || !sessionStorage.getItem('token')) {
      setOrdenes([]);
      setErrorPedidos('');
      return undefined;
    }

    let activo = true;
    const consulta = usuarioActual.rol === 'admin'
      ? listarTodosPedidosAPI()
      : listarMisPedidosAPI();
    consulta
      .then((datos) => {
        if (activo) {
          setOrdenes(datos);
          setErrorPedidos('');
        }
      })
      .catch((error) => {
        if (activo) setErrorPedidos(error.message);
      });
    return () => { activo = false; };
  }, [usuarioActual]);


useEffect(() => {
    guardarDatos(claves.carrito, carrito);
  }, [carrito]);

useEffect(() => {
    const usuariosPublicos = usuarios.map((usuario) => {
      const datosPublicos = { ...usuario };
      delete datosPublicos.password;
      return datosPublicos;
    });
    guardarDatos(claves.usuarios, usuariosPublicos);
  }, [usuarios]);

  useEffect(() => {
    if (usuarioActual) {
      const usuarioSeguro = { ...usuarioActual };
      delete usuarioSeguro.password;
      guardarDatos(claves.usuarioActual, usuarioSeguro);
    } else {
      eliminarDatos(claves.usuarioActual);
    }
  }, [usuarioActual]);

  async function guardarSesion(datos) {
    sessionStorage.setItem('token', datos.token);
    const usuario = {
      nombre: datos.nombre,
      email: datos.correo,
      rol: datos.rol.toLowerCase(),
    };
    setUsuarioActual(usuario);
    return { exito: true };
  }

  async function registrarUsuario(nuevoUsuario) {
    try {
      const datos = await registrarUsuarioAPI(nuevoUsuario);
      return await guardarSesion(datos);
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  async function iniciarSesion(email, password) {
    try {
      const datos = await iniciarSesionAPI(email, password);
      return await guardarSesion(datos);
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }

  function cerrarSesion() {
    sessionStorage.removeItem('token');
    setUsuarioActual(null);
  }

  async function procesarPedido(datosPedido) {
    const pedido = await crearPedidoAPI(datosPedido);
    setOrdenes((actuales) => [pedido, ...actuales.filter((item) => item.id !== pedido.id)]);
    setErrorPedidos('');

    try {
      const datos = await listarProductosAPI();
      setProductos(datos);
      setErrorProductos('');
    } catch (error) {
      setErrorProductos(error.message);
    }
    return pedido;
  }

  function agregarAlCarrito(producto) {
    const resultado = validarAgregar(producto, productos, carrito);
    if (!resultado.valido) {
      alert(resultado.mensaje);
      return;
    }
    setCarrito((actual) => agregarProducto(actual, producto));
  }

  function cambiarCantidad(id, nuevaCantidad) {
    const stock = obtenerStock(productos, id);
    setCarrito((actual) => actualizarCantidad(actual, id, nuevaCantidad, stock));
  }

  function eliminarDelCarrito(id) {
    setCarrito((actual) => eliminarProducto(actual, id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }
  const rolActual = obtenerRolUsuario(usuarioActual);

  return (
    <>
      <Navegacion
        cantidadTotal={calcularCantidadTotal(carrito)}
        usuarioActual={usuarioActual}
        cerrarSesion={cerrarSesion}
      />

      {cargandoProductos && <p role="status" style={{ textAlign: 'center' }}>Cargando catálogo...</p>}
      {errorProductos && <p role="alert" style={{ textAlign: 'center', color: '#b91c1c' }}>No se pudo cargar el catálogo: {errorProductos}</p>}
      <Routes>
        <Route path="/" element={<PagPrincipal productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/productos" element={<Cartelera productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/ofertas" element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/cobertura" element={<Cobertura />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/login"
          element={
            <Login
              iniciarSesion={iniciarSesion}
              registrarUsuario={registrarUsuario}
              usuarioActual={usuarioActual}
            />
          }
        />
        <Route
          path="/perfil"
          element={
            <Perfil
              usuarioActual={usuarioActual}
              ordenes={ordenes}
              errorPedidos={errorPedidos}
              cerrarSesion={cerrarSesion}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              productos={productos}
              cambiarCantidad={cambiarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
              usuarioActual={usuarioActual}
              crearPedido={procesarPedido}
            />
          }
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route
          path="/admin"
          element={
            usuarioActual && (rolActual === 'admin' || rolActual === 'vendedor') ? (
              <AdminDashboard
                productos={productos}
                setProductos={setProductos}
                usuarios={usuarios}
                ordenes={ordenes}
                usuarioActual={usuarioActual}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

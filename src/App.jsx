import { useState, useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { productos as productosIniciales } from './data/productos';
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
import { crearOrden } from './utils/ordenes';
import {
  agregarProducto,
  actualizarCantidad,
  calcularCantidadTotal,
  calcularTotal,
  descontarStock as restarStock,
  eliminarProducto,
  validarAgregar,
} from './utils/carrito';
import {
  buscarUsuario,
  obtenerRolUsuario,
  registrarNuevoUsuario,
  usuariosDemo,
} from './utils/usuarios';

function App() {
  const [productos, setProductos] = useState(() =>
    leerDatos(claves.productos, productosIniciales)
  );
  const [carrito, setCarrito] = useState(() => leerDatos(claves.carrito, []));
  const [ordenes, setOrdenes] = useState(() => leerDatos(claves.ordenes, []));
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = leerDatos(claves.usuarios, []);
    const extras = guardados.filter(
      (g) => !usuariosDemo.some((d) => d.email.toLowerCase() === g.email?.toLowerCase())
    );
    return [...usuariosDemo, ...extras];
  });
  const [usuarioActual, setUsuarioActual] = useState(() =>
    leerDatos(claves.usuarioActual, null)
  );

  useEffect(() => {
    guardarDatos(claves.productos, productos);
  }, [productos]);

  useEffect(() => {
    guardarDatos(claves.carrito, carrito);
  }, [carrito]);

  useEffect(() => {
    guardarDatos(claves.ordenes, ordenes);
  }, [ordenes]);

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

  function registrarUsuario(nuevoUsuario) {
    const usuarioConRol = { ...nuevoUsuario, rol: 'cliente' };
    const resultado = registrarNuevoUsuario(usuarios, usuarioConRol);
    if (resultado.exito) {
      setUsuarios(resultado.usuarios);
      setUsuarioActual(usuarioConRol);
    }
    return resultado;
  }

  function iniciarSesion(email, password) {
    const usuario = buscarUsuario(usuarios, email, password);
    if (!usuario) {
      return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
    }
    setUsuarioActual(usuario);
    return { exito: true };
  }

  function cerrarSesion() {
    setUsuarioActual(null);
  }

  function registrarOrden(datosOrden) {
    const nuevaOrden = crearOrden(datosOrden);
    setOrdenes((actuales) => [nuevaOrden, ...actuales]);
    return nuevaOrden;
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

  function descontarStock() {
    setProductos((actuales) => restarStock(actuales, carrito));
  }

  const { total: totalPedido } = calcularTotal(carrito);
  const rolActual = obtenerRolUsuario(usuarioActual);

  return (
    <>
      <Navegacion
        cantidadTotal={calcularCantidadTotal(carrito)}
        usuarioActual={usuarioActual}
        cerrarSesion={cerrarSesion}
      />

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
              descontarStock={descontarStock}
              totalPedido={totalPedido}
              usuarioActual={usuarioActual}
              registrarOrden={registrarOrden}
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
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
import Carrito from './pages/Carrito';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound404 from './pages/NotFound404';
import { claves, leerDatos, guardarDatos, eliminarDatos } from './utils/persistencia';
import { obtenerStock } from './utils/funcionesProductos';
import {
  agregarProducto,
  actualizarCantidad,
  calcularCantidadTotal,
  calcularTotal,
  descontarStock as restarStock,
  eliminarProducto,
  validarAgregar,
} from './utils/carrito';
import { buscarUsuario, registrarNuevoUsuario } from './utils/usuarios';

function App() {
  const [productos, setProductos] = useState(() =>
    leerDatos(claves.productos, productosIniciales)
  );
  const [carrito, setCarrito] = useState(() => leerDatos(claves.carrito, []));
  const [usuarios, setUsuarios] = useState(() => leerDatos(claves.usuarios, []));
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
    const resultado = registrarNuevoUsuario(usuarios, nuevoUsuario);
    if (resultado.exito) {
      setUsuarios(resultado.usuarios);
      setUsuarioActual(nuevoUsuario);
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
            />
          }
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route
          path="/admin"
          element={
            usuarioActual?.rol === 'admin' ? (
              <AdminDashboard productos={productos} setProductos={setProductos} usuarios={usuarios} />
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

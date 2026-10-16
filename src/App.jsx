import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Cabecera from './components/Cabecera';
import Footer from './components/Footer';

import CarteleraProductos from './pages/CarteleraProductos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Contacto from './pages/Contacto';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import AdminDashboard from './pages/AdminDashboard';
import Error from './pages/Error';

import { productosIniciales } from './data/productos';

function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });

  const [carrito, setCarrito] = useState(() => {
    const guardados = localStorage.getItem('carrito');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem('usuarioActual');
    return guardado ? JSON.parse(guardado) : null;
  });

  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    } else {
      localStorage.removeItem('usuarioActual');
    }
  }, [usuarioActual]);

  const iniciarSesion = (email, password) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (usuarioEncontrado) {
      setUsuarioActual(usuarioEncontrado);
      return { exito: true };
    }
    return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
  };

  const registrarUsuario = (nuevoUsuario) => {
    const existe = usuarios.some((u) => u.email === nuevoUsuario.email);
    if (existe) {
      return { exito: false, mensaje: 'El correo ya se encuentra registrado.' };
    }
    const listaActualizada = [...usuarios, nuevoUsuario];
    setUsuarios(listaActualizada);
    localStorage.setItem('usuarios', JSON.stringify(listaActualizada));
    setUsuarioActual(nuevoUsuario);
    return { exito: true };
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const descontarStock = () => {
    setProductos((prevProductos) =>
      prevProductos.map((p) => {
        const itemCarrito = carrito.find((item) => item.id === p.id);
        if (itemCarrito) {
          return { ...p, stock: Math.max(0, p.stock - itemCarrito.cantidad) };
        }
        return p;
      })
    );
    vaciarCarrito();
  };

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="app-container">
      <Cabecera cantidadTotal={cantidadTotal} usuarioActual={usuarioActual} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<CarteleraProductos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
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
                usuarioActual={usuarioActual}
                cambiarCantidad={cambiarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
                vaciarCarrito={vaciarCarrito}
                descontarStock={descontarStock}
              />
            }
          />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-error" element={<PagoError />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                productos={productos}
                setProductos={setProductos}
                usuarios={usuarios}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
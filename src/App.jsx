import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de Estilos CSS
import './App.css';
import './index.css';

import Cabecera from './components/Cabecera';
import Footer from './components/Footer';

import PagPrincipal from './pages/PagPrincipal';
import CarteleraProductos from './pages/CarteleraProductos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Contacto from './pages/Contacto';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import AdminDashboard from './pages/AdminDashboard';
import NotFound404 from './pages/NotFound404';
import Blog from './pages/Blog';
import Cobertura from './pages/Cobertura';
import Nosotros from './pages/Nosotros';
import Ofertas from './pages/Ofertas';

import { productos as productosBase } from './data/productos';

function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productosStock');
    if (!guardados) return productosBase;
    try {
      const listaGuardada = JSON.parse(guardados);
      return productosBase.map((base) => {
        const guardado = listaGuardada.find((g) => g.id === base.id);
        if (!guardado || guardado.stock === undefined || guardado.stock === null) {
          return base;
        }
        return guardado;
      });
    } catch {
      return productosBase;
    }
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
    localStorage.setItem('productosStock', JSON.stringify(productos));
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

  const cerrarSesion = () => {
    setUsuarioActual(null);
    localStorage.removeItem('usuarioActual');
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
      const cantidadActual = existe ? existe.cantidad : 0;
      if (cantidadActual + 1 > producto.stock) {
        alert(`No puedes agregar más de ${producto.stock} unidades de este producto.`);
        return prev;
      }
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    const prod = productos.find((p) => p.id === id);
    const maxStock = prod ? prod.stock : 999;

    let nuevaCantidad = cantidad;
    if (nuevaCantidad > maxStock) {
      alert(`La cantidad máxima disponible en stock es ${maxStock} unidades.`);
      nuevaCantidad = maxStock;
    }

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
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
      <Cabecera 
        cantidadTotal={cantidadTotal} 
        usuarioActual={usuarioActual} 
        cerrarSesion={cerrarSesion} 
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PagPrincipal productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/productos" element={<CarteleraProductos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/ofertas" element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/cobertura" element={<Cobertura />} />
          <Route path="/blog" element={<Blog />} />
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
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
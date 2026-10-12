import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Cabecera from './components/Cabecera';
import Footer from './components/Footer';
import PagPrincipal from './pages/PagPrincipal';
import Nosotros from './pages/Nosotros';
import Cobertura from './pages/Cobertura';
import Cartelera from './pages/CarteleraProductos';
import Error from './pages/NotFound404';

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carritoProductos');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
    alert(`¡${producto.nombre} añadido al pedido!`);
  }

  return (
    <>
      <Cabecera />

      <Routes>
        <Route path="/" element={<PagPrincipal />} />
        <Route path="/productos" element={<Cartelera agregar={agregarAlCarrito} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/cobertura" element={<Cobertura />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
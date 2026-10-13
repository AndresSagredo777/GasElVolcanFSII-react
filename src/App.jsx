import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { productos as productosIniciales } from './data/productos';
import Cabecera from './components/Cabecera';
import Footer from './components/Footer';
import PagPrincipal from './pages/PagPrincipal';
import Nosotros from './pages/Nosotros';
import Cobertura from './pages/Cobertura';
import Cartelera from './pages/CarteleraProductos';
import Carrito from './pages/Carrito';
import Error from './pages/NotFound404';

function App() {
  const [productos, setProductos] = useState(() => {
    try {
      const guardado = localStorage.getItem('productosStock');
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (parsed.length === productosIniciales.length) {
          return parsed;
        }
      }
      return productosIniciales;
    } catch {
      return productosIniciales;
    }
  });

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carritoProductos');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('productosStock', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    if (!producto) return;

    const prodEnInventario = productos.find((p) => Number(p.id) === Number(producto.id));
    const itemEnCarrito = carrito.find((item) => Number(item.id) === Number(producto.id));
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    const stockDisponible = prodEnInventario ? Number(prodEnInventario.stock) : 0;

    if (stockDisponible <= 0) {
      alert(`¡El producto ${producto.nombre} está agotado!`);
      return;
    }

    if (cantidadActual + 1 > stockDisponible) {
      alert(`Solo quedan ${stockDisponible} unidades disponibles de ${producto.nombre}.`);
      return;
    }

    setCarrito((prevCarrito) => {
      if (itemEnCarrito) {
        return prevCarrito.map((item) =>
          Number(item.id) === Number(producto.id)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [
        ...prevCarrito, 
        { 
          ...producto, 
          cantidad: 1, 
          stock: stockDisponible,
          img: producto.imagen || producto.img 
        }
      ];
    });
  }

  function cambiarCantidad(id, nuevaCantidad) {
    const prodEnInventario = productos.find((p) => Number(p.id) === Number(id));
    if (!prodEnInventario) return;

    const stockMaximo = Number(prodEnInventario.stock);
    let cantidadFinal = Number(nuevaCantidad) || 1;

    if (cantidadFinal > stockMaximo) {
      cantidadFinal = stockMaximo;
    }

    if (cantidadFinal <= 0) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((prev) =>
      prev.map((item) =>
        Number(item.id) === Number(id) ? { ...item, cantidad: cantidadFinal } : item
      )
    );
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function descontarStock() {
    setProductos((prevProductos) =>
      prevProductos.map((prod) => {
        const itemComprado = carrito.find((item) => Number(item.id) === Number(prod.id));
        if (itemComprado) {
          const nuevoStock = Number(prod.stock) - Number(itemComprado.cantidad);
          return { ...prod, stock: nuevoStock < 0 ? 0 : nuevoStock };
        }
        return prod;
      })
    );
  }

  return (
    <>
      <Cabecera cantidadTotal={carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0)} />

      <Routes>
        <Route path="/" element={<PagPrincipal agregar={agregarAlCarrito} />} />
        <Route 
          path="/productos" 
          element={<Cartelera productos={productos} agregar={agregarAlCarrito} />} 
        />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/cobertura" element={<Cobertura />} />
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
            />
          } 
        />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
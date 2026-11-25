import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Carrito from './Carrito';

const productosMock = [
  { id: 1, nombre: 'Cilindro GLP 11 kg', precio: 11000, stock: 10, imagen: 'assets/cilindro11kg.png' },
];

const carritoMock = [
  { id: 1, nombre: 'Cilindro GLP 11 kg', precio: 11000, cantidad: 2, stock: 10, imagen: 'assets/cilindro11kg.png' },
];

function renderCarrito(props = {}) {
  return render(
    <MemoryRouter initialEntries={['/carrito']}>
      <Routes>
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carritoMock}
              productos={productosMock}
              cambiarCantidad={vi.fn()}
              eliminarDelCarrito={vi.fn()}
              vaciarCarrito={vi.fn()}
              descontarStock={vi.fn()}
              totalPedido={24000}
              {...props}
            />
          }
        />
        <Route path="/pago-exitoso" element={<div>Pantalla Pago Exitoso</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Carrito', () => {
  it('muestra aviso cuando el carrito está vacío', () => {
    renderCarrito({ carrito: [] });
    expect(screen.getByText('Tu Carrito está vacío')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver Catálogo' })).toHaveAttribute('href', '/productos');
  });

  it('calcula totales y ejecuta el mock al eliminar un producto', () => {
    const eliminarDelCarrito = vi.fn();
    renderCarrito({ eliminarDelCarrito });

    expect(screen.getByText('Cilindro GLP 11 kg')).toBeInTheDocument();
    expect(screen.getByText('$24.000')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '✕' }));
    expect(eliminarDelCarrito).toHaveBeenCalledWith(1);
  });

  it('valida campos obligatorios en el modal de despacho', () => {
    renderCarrito();
    fireEvent.click(screen.getByRole('button', { name: 'Ir a Pagar' }));
    fireEvent.click(screen.getByRole('button', { name: /Confirmar Pedido/ }));

    expect(screen.getByText('Ingresa un nombre completo válido.')).toBeInTheDocument();
    expect(screen.getByText('Ingresa una dirección con número.')).toBeInTheDocument();
    expect(screen.getByText('Teléfono inválido (ej: 912345678).')).toBeInTheDocument();
  });

  it('autocompleta datos de sesión y registra la orden al confirmar compra', () => {
    const vaciarCarrito = vi.fn();
    const descontarStock = vi.fn();
    const registrarOrden = vi.fn(() => ({ numero: '#20269999' }));

    renderCarrito({
      usuarioActual: {
        nombre: 'Carlos Pérez',
        direccion: 'Av. Concha y Toro 450',
        telefono: '987654321',
      },
      vaciarCarrito,
      descontarStock,
      registrarOrden,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Ir a Pagar' }));

    expect(screen.getByPlaceholderText('Ej: Juan Pérez')).toHaveValue('Carlos Pérez');
    expect(screen.getByPlaceholderText('Ej: Av. Concha y Toro 1234')).toHaveValue('Av. Concha y Toro 450');

    fireEvent.click(screen.getByRole('button', { name: /Confirmar Pedido/ }));

    expect(registrarOrden).toHaveBeenCalledOnce();
    expect(descontarStock).toHaveBeenCalledOnce();
    expect(vaciarCarrito).toHaveBeenCalledOnce();
    expect(screen.getByText('Pantalla Pago Exitoso')).toBeInTheDocument();
  });
});
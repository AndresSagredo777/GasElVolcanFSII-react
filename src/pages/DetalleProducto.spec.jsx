import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import DetalleProducto from './DetalleProducto';

const productosMock = [
  { id: 1, nombre: 'Cilindro GLP 11 kg', categoria: 'Cilindros de Gas', precio: 11000, stock: 5, descripcion: 'Uso doméstico' },
  { id: 2, nombre: 'Detector de Gas', categoria: 'Accesorios', precio: 17000, stock: 0, descripcion: 'Sensor GLP' },
];

function renderDetalle(ruta, agregarAlCarrito = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route
          path="/producto/:id"
          element={<DetalleProducto productos={productosMock} agregarAlCarrito={agregarAlCarrito} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetalleProducto', () => {
  it('muestra el detalle del producto según el id de la ruta y permite agregarlo', () => {
    const agregarAlCarrito = vi.fn();
    renderDetalle('/producto/1', agregarAlCarrito);

    expect(screen.getByRole('heading', { name: 'Cilindro GLP 11 kg' })).toBeInTheDocument();
    expect(screen.getByText('Stock Disponible: 5 unidades')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Añadir al Carrito/i }));
    expect(agregarAlCarrito).toHaveBeenCalledWith(productosMock[0]);
  });

  it('deshabilita el botón cuando el producto está agotado', () => {
    renderDetalle('/producto/2');
    expect(screen.getByRole('button', { name: 'Sin Stock' })).toBeDisabled();
  });

  it('muestra mensaje cuando el producto no existe', () => {
    renderDetalle('/producto/999');
    expect(screen.getByText('Producto no encontrado')).toBeInTheDocument();
  });
});
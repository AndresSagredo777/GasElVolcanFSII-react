import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import TarjetaProducto from './TarjetaProducto';

const productoBase = {
  id: 1,
  nombre: 'Cilindro GLP 11 kg',
  descripcion: 'Cilindro para uso doméstico',
  imagen: 'assets/cilindro11kg.png',
  precio: 11000,
  stock: 5,
};

function renderTarjeta(props) {
  return render(
    <MemoryRouter>
      <TarjetaProducto {...props} />
    </MemoryRouter>
  );
}

describe('TarjetaProducto', () => {
  it('muestra información, enlaza al detalle y llama a agregar cuando tiene stock', () => {
    const onAgregar = vi.fn();
    renderTarjeta({ producto: productoBase, onAgregar });

    expect(screen.getByRole('heading', { name: productoBase.nombre })).toBeInTheDocument();
    expect(screen.getByText('Stock disponible: 5 un.')).toBeInTheDocument();
    expect(screen.getByText('$11.000')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cilindro GLP 11 kg/i })).toHaveAttribute(
      'href',
      '/producto/1'
    );
    expect(screen.getByRole('img', { name: productoBase.nombre })).toHaveAttribute(
      'src',
      '/assets/cilindro11kg.png'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Añadir al pedido' }));
    expect(onAgregar).toHaveBeenCalledWith(productoBase);
  });

  it('muestra la oferta, descuento y precio anterior cuando el producto está en oferta', () => {
    renderTarjeta({
      producto: { ...productoBase, oferta: true, descuento: 15, precioAnterior: 13000 },
      onAgregar: () => {},
    });

    expect(screen.getByText(/15% OFF/)).toBeInTheDocument();
    expect(screen.getByText('$13.000')).toBeInTheDocument();
    expect(screen.getByText('$11.000')).toHaveClass('en-oferta');
  });

  it('muestra el valor de oferta genérico si no hay descuento', () => {
    renderTarjeta({ producto: { ...productoBase, oferta: true }, onAgregar: () => {} });
    expect(screen.getByText(/En Oferta/)).toBeInTheDocument();
  });

  it('deshabilita la acción cuando no queda stock', () => {
    const onAgregar = vi.fn();
    renderTarjeta({ producto: { ...productoBase, stock: 0 }, onAgregar });

    const boton = screen.getByRole('button', { name: 'Sin Stock' });
    expect(boton).toBeDisabled();
    expect(screen.getByText('Agotado')).toBeInTheDocument();
    fireEvent.click(boton);
    expect(onAgregar).not.toHaveBeenCalled();
  });

  it('cambia la imagen a la predeterminada cuando la imagen del producto falla', () => {
    renderTarjeta({ producto: productoBase, onAgregar: () => {} });
    const imagen = screen.getByRole('img', { name: productoBase.nombre });
    fireEvent.error(imagen);
    expect(imagen).toHaveAttribute('src', '/assets/cilindro11kg.png');
  });
});
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CarteleraProductos from './CarteleraProductos';

const productos = [
  { id: 1, nombre: 'Cilindro 5 kg', categoria: 'Cilindros', descripcion: '', imagen: 'a.png', precio: 6500, stock: 10 },
  { id: 2, nombre: 'Regulador', categoria: 'Accesorios', descripcion: '', imagen: 'b.png', precio: 8990, stock: 5 },
];

describe('CarteleraProductos', () => {
  it('muestra todos los productos al inicio', () => {
    render(<CarteleraProductos productos={productos} agregar={() => {}} />);
    expect(screen.getByText('Cilindro 5 kg')).toBeInTheDocument();
    expect(screen.getByText('Regulador')).toBeInTheDocument();
  });

  it('el filtro por categoría cambia los resultados', async () => {
    const usuario = userEvent.setup();
    render(<CarteleraProductos productos={productos} agregar={() => {}} />);

    await usuario.click(screen.getByRole('button', { name: 'Accesorios' }));

    expect(screen.getByText('Regulador')).toBeInTheDocument();
    expect(screen.queryByText('Cilindro 5 kg')).not.toBeInTheDocument();
  });
});

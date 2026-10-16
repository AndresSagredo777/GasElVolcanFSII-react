import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound404 from './NotFound404';

describe('NotFound404', () => {
  it('muestra el mensaje de página no encontrada y un enlace al inicio', () => {
    render(
      <MemoryRouter>
        <NotFound404 />
      </MemoryRouter>
    );
    expect(screen.getByText('Página No Encontrada')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/');
  });
});

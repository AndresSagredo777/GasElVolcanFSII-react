import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Navegacion from './Navegacion';

function renderNavegacion(props = {}) {
  return render(
    <MemoryRouter>
      <Navegacion {...props} />
    </MemoryRouter>
  );
}

describe('Navegacion', () => {
  it('muestra enlaces y valores predeterminados', () => {
    renderNavegacion();
    expect(screen.getByRole('link', { name: 'Gas El Volcan' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '🛒 Carrito (0)' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ingresar/ })).toBeInTheDocument();
  });

  it('abre y cierra el menú móvil al activar el botón', () => {
    renderNavegacion({ cantidadTotal: 2 });
    const botonMenu = screen.getByRole('button', { name: 'Abrir o cerrar navegación' });
    const menu = document.getElementById('menu-principal');

    expect(botonMenu).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(botonMenu);
    expect(botonMenu).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveClass('menu-abierto');
    expect(screen.getByRole('link', { name: '🛒 Carrito (2)' })).toBeInTheDocument();

    fireEvent.click(botonMenu);
    expect(botonMenu).toHaveAttribute('aria-expanded', 'false');
    expect(menu).not.toHaveClass('menu-abierto');
  });

  it('cierra el menú al elegir una ruta', () => {
    renderNavegacion();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir o cerrar navegación' }));
    fireEvent.click(screen.getByRole('link', { name: 'Productos' }));
    expect(document.getElementById('menu-principal')).not.toHaveClass('menu-abierto');
  });

  it('muestra el nombre o correo del usuario y permite cerrar sesión', () => {
    const cerrarSesion = vi.fn();
    renderNavegacion({ usuarioActual: { nombre: 'Ana Soto' }, cerrarSesion });
    const botonSalir = screen.getByRole('button', { name: /Ana Soto.*Salir/ });
    fireEvent.click(botonSalir);
    expect(cerrarSesion).toHaveBeenCalledOnce();
  });

  it('usa el correo como identificación si el usuario no tiene nombre', () => {
    renderNavegacion({ usuarioActual: { email: 'ana@correo.cl' } });
    expect(screen.getByRole('button', { name: /ana@correo.cl.*Salir/ })).toBeInTheDocument();
  });

  it('muestra un nombre genérico si faltan nombre y correo', () => {
    renderNavegacion({ usuarioActual: {} });
    expect(screen.getByRole('button', { name: /Usuario.*Salir/ })).toBeInTheDocument();
  });
});

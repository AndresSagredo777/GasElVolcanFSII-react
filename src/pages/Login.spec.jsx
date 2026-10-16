import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Login from './Login';

function RutaActual() {
  const location = useLocation();
  return <span data-testid="ruta-actual">{location.pathname}</span>;
}

function renderLogin(props = {}) {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Login iniciarSesion={() => ({ exito: false, mensaje: 'Credenciales incorrectas.' })}
        registrarUsuario={() => ({ exito: false, mensaje: 'No se pudo registrar.' })}
        usuarioActual={null}
        {...props}
      />
      <RutaActual />
    </MemoryRouter>
  );
}

function cambiarCampo(placeholder, value, indice = 0) {
  const campos = screen.getAllByPlaceholderText(placeholder);
  fireEvent.change(campos[indice], { target: { value } });
}

describe('Login', () => {
  it('muestra el inicio de sesión y sus pestañas', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: 'Acceso a Clientes' })).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('muestra errores de validación y los limpia al corregir un campo', () => {
    renderLogin();
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }).closest('form'));
    expect(screen.getByText('Por favor ingresa tu correo y contraseña.')).toBeInTheDocument();

    cambiarCampo('ejemplo@correo.cl', 'cliente@correo.cl');
    expect(screen.queryByText('Por favor ingresa tu correo y contraseña.')).not.toBeInTheDocument();
  });

  it('muestra el mensaje de acceso rechazado cuando las credenciales no sirven', () => {
    const iniciarSesion = vi.fn(() => ({ exito: false, mensaje: 'Credenciales incorrectas.' }));
    renderLogin({ iniciarSesion });
    cambiarCampo('ejemplo@correo.cl', 'cliente@correo.cl');
    cambiarCampo('••••••••', 'clave123');
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }).closest('form'));

    expect(iniciarSesion).toHaveBeenCalledWith('cliente@correo.cl', 'clave123');
    expect(screen.getByText('Credenciales incorrectas.')).toBeInTheDocument();
  });

  it('dirige al carrito al iniciar sesión correctamente', () => {
    const iniciarSesion = vi.fn(() => ({ exito: true }));
    renderLogin({ iniciarSesion });
    cambiarCampo('ejemplo@correo.cl', 'cliente@correo.cl');
    cambiarCampo('••••••••', 'clave123');
    fireEvent.submit(screen.getByRole('button', { name: 'Ingresar' }).closest('form'));
    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/carrito');
  });

  it('valida los datos del registro antes de llamar al callback', () => {
    const registrarUsuario = vi.fn(() => ({ exito: true }));
    renderLogin({ registrarUsuario });
    fireEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }));

    cambiarCampo('Juan Pérez', 'A');
    fireEvent.submit(screen.getByRole('button', { name: 'Registrarse y Entrar' }).closest('form'));
    expect(screen.getByText('Ingresa tu nombre completo.')).toBeInTheDocument();
    expect(registrarUsuario).not.toHaveBeenCalled();
  });

  it('permite completar el registro y navega al carrito', () => {
    const registrarUsuario = vi.fn(() => ({ exito: true }));
    renderLogin({ registrarUsuario });
    fireEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }));

    cambiarCampo('Juan Pérez', 'Juan Pérez');
    cambiarCampo('juan.perez@gmail.com', 'juan@correo.cl');
    cambiarCampo('912345678', '912345678');
    cambiarCampo('Av. Concha y Toro 123', 'Av. Central 123');
    cambiarCampo('••••••••', 'clave123', 0);
    cambiarCampo('••••••••', 'clave123', 1);
    fireEvent.submit(screen.getByRole('button', { name: 'Registrarse y Entrar' }).closest('form'));

    expect(registrarUsuario).toHaveBeenCalledWith({
      nombre: 'Juan Pérez', email: 'juan@correo.cl', telefono: '912345678',
      direccion: 'Av. Central 123', password: 'clave123',
    });
    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/carrito');
  });

  it('muestra el error entregado cuando el registro no se completa', () => {
    const registrarUsuario = vi.fn(() => ({ exito: false, mensaje: 'El correo ya existe.' }));
    renderLogin({ registrarUsuario });
    fireEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }));
    cambiarCampo('Juan Pérez', 'Juan Pérez');
    cambiarCampo('juan.perez@gmail.com', 'juan@correo.cl');
    cambiarCampo('••••••••', 'clave123', 0);
    cambiarCampo('••••••••', 'clave123', 1);
    fireEvent.submit(screen.getByRole('button', { name: 'Registrarse y Entrar' }).closest('form'));
    expect(screen.getByText('El correo ya existe.')).toBeInTheDocument();
  });

  it('muestra el panel de sesión activa para una persona ya conectada', () => {
    renderLogin({ usuarioActual: { nombre: 'Ana Soto' } });
    expect(screen.getByText('¡Sesión Activa!')).toBeInTheDocument();
    expect(screen.getByText('Ana Soto')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ir al Inicio' }));
    expect(screen.getByTestId('ruta-actual')).toHaveTextContent('/');
  });
});

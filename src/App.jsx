import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Cabecera from './components/Cabecera';
import Footer from './components/Footer';
import Login from './pages/Login';
import Contacto from './pages/Contacto';
import { obtenerProductos, crearProducto } from './data/productos';

const renderConRouter = (componente) => {
  return render(<BrowserRouter>{componente}</BrowserRouter>);
};

describe('Suite de 10 Pruebas Unitarias - Gas El Volcan', () => {

  // PRUEBA 1: Renderizado de la Cabecera
  it('1. Debe renderizar el nombre de la marca en la Cabecera', () => {
    renderConRouter(<Cabecera cantidadTotal={0} usuarioActual={null} />);
    expect(screen.getByText('Gas El Volcan')).toBeTruthy();
  });

  // PRUEBA 2: Conteo del Carrito en Cabecera
  it('2. Debe mostrar la cantidad correcta de items en el carrito', () => {
    renderConRouter(<Cabecera cantidadTotal={3} usuarioActual={null} />);
    expect(screen.getByText('🛒 Carrito (3)')).toBeTruthy();
  });

  // PRUEBA 3: Renderizado del Footer
  it('3. Debe renderizar la información de contacto en el Footer', () => {
    renderConRouter(<Footer />);
    expect(screen.getByText('gaselvolcan@gmail.cl')).toBeTruthy();
  });

  // PRUEBA 4: Manejo de Inputs en Login
  it('4. Debe permitir interactuar con los campos de correo y contraseña en Login', () => {
    renderConRouter(
      <Login 
        iniciarSesion={() => ({ exito: false, mensaje: 'Error' })} 
        registrarUsuario={() => {}} 
        usuarioActual={null} 
      />
    );

    const inputEmail = screen.getByPlaceholderText('ejemplo@correo.cl');
    const inputPass = screen.getByPlaceholderText('••••••••');
    
    fireEvent.change(inputEmail, { target: { value: 'usuario@test.cl' } });
    fireEvent.change(inputPass, { target: { value: 'clave123' } });
    
    expect(inputEmail.value).toBe('usuario@test.cl');
    expect(inputPass.value).toBe('clave123');
  });

  // PRUEBA 5: Cambio de Estado en Inputs de Formulario (Contacto)
  it('5. Debe actualizar el valor del campo de correo en Contacto al escribir', () => {
    renderConRouter(<Contacto />);
    const inputEmail = screen.getByPlaceholderText('correo@ejemplo.cl');
    fireEvent.change(inputEmail, { target: { value: 'cliente@test.cl' } });
    expect(inputEmail.value).toBe('cliente@test.cl');
  });

  // PRUEBA 6: Simulación de Evento de Envío en Formulario
  it('6. Debe mostrar mensaje de éxito al enviar el formulario de Contacto', () => {
    renderConRouter(<Contacto />);
    const inputNombre = screen.getByPlaceholderText('Juan Pérez');
    const inputEmail = screen.getByPlaceholderText('correo@ejemplo.cl');
    const inputMensaje = screen.getByPlaceholderText('Escribe tu mensaje aquí...');
    const botonEnviar = screen.getByRole('button', { name: /Enviar Mensaje/i });

    fireEvent.change(inputNombre, { target: { value: 'Pedro Soto' } });
    fireEvent.change(inputEmail, { target: { value: 'pedro@correo.cl' } });
    fireEvent.change(inputMensaje, { target: { value: 'Necesito una cotización de 5 cilindros.' } });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/¡Mensaje enviado con éxito!/i)).toBeTruthy();
  });

  // PRUEBA 7: Verificación de Propiedades (Props) en Usuario Logueado
  it('7. Debe mostrar el nombre del usuario cuando hay una sesión activa', () => {
    const usuarioMock = { nombre: 'Carlos Silva', email: 'carlos@test.cl' };
    renderConRouter(<Cabecera cantidadTotal={0} usuarioActual={usuarioMock} />);
    expect(screen.getByText('👤 Carlos')).toBeTruthy();
  });

  // PRUEBA 8: Lectura Correcta de la Fuente de Datos (CRUD - Read)
  it('8. Debe retornar la lista inicial de productos desde la fuente de datos', () => {
    const lista = obtenerProductos();
    expect(lista.length).toBeGreaterThan(0);
  });

  // PRUEBA 9: Creación de un Nuevo Registro en la Fuente de Datos (CRUD - Create)
  it('9. Debe agregar un nuevo producto mediante la función CRUD crearProducto', () => {
    const nuevoProd = {
      nombre: 'Cilindro Test 10kg',
      categoria: 'Cilindros de Gas',
      precio: 15000,
      stock: 10,
      descripcion: 'Producto de prueba'
    };
    const listaActualizada = crearProducto(nuevoProd);
    const existe = listaActualizada.some((p) => p.nombre === 'Cilindro Test 10kg');
    expect(existe).toBe(true);
  });

  // PRUEBA 10: Cambio entre Pestañas (Simulación de Interacción DOM)
  it('10. Debe cambiar a la pestaña Crear Cuenta al hacer clic en Login', () => {
    renderConRouter(
      <Login iniciarSesion={() => {}} registrarUsuario={() => {}} usuarioActual={null} />
    );
    const btnCrearCuenta = screen.getByRole('button', { name: /Crear Cuenta/i });
    fireEvent.click(btnCrearCuenta);
    expect(screen.getByPlaceholderText('Juan Pérez')).toBeTruthy();
  });

});
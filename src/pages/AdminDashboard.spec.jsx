import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AdminDashboard from './AdminDashboard';

const productosMock = [
  { id: 1, nombre: 'Cilindro 5 kg', categoria: 'Cilindros de Gas', precio: 6500, stock: 3, oferta: false, imagen: 'assets/cilindro5kg.jpg' },
  { id: 2, nombre: 'Regulador Dual', categoria: 'Accesorios', precio: 13500, stock: 20, oferta: true, imagen: 'assets/reguladordual.png' },
];

const ordenesMock = [
  {
    id: 10,
    numero: '#20261234',
    fecha: '22-11-2026',
    cliente: { nombre: 'Ana Soto', direccion: 'Los Aromos 12', comuna: 'Puente Alto', telefono: '912345678', metodoPago: 'efectivo' },
    items: [{ id: 1, nombre: 'Cilindro 5 kg', cantidad: 1, precio: 6500 }],
    total: 8500,
    estado: 'Confirmado',
  },
];

describe('AdminDashboard - Control de Roles y CRUD', () => {
  it('muestra acceso total, métricas y CRUD completo para el rol Administrador', () => {
    const setProductos = vi.fn();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <AdminDashboard
        productos={productosMock}
        setProductos={setProductos}
        usuarios={[{ nombre: 'Ana Soto', email: 'ana@correo.cl', rol: 'cliente' }]}
        ordenes={ordenesMock}
        usuarioActual={{ nombre: 'Admin', rol: 'admin' }}
      />
    );

    expect(screen.getByText('Panel de Control (Dashboard)')).toBeInTheDocument();
    expect(screen.getByText('Alerta de Productos con Stock Crítico')).toBeInTheDocument();
    expect(screen.getByText('Cilindro 5 kg')).toBeInTheDocument();

    // Abrir modal y crear producto
    fireEvent.click(screen.getByRole('button', { name: /Agregar Nuevo Producto/i }));
    fireEvent.change(screen.getByPlaceholderText('ej. Cilindro GLP 15 kg'), { target: { value: 'Cilindro 45 kg' } });
    fireEvent.change(screen.getByPlaceholderText('22900'), { target: { value: '40000' } });
    fireEvent.change(screen.getByPlaceholderText('15'), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear Producto' }));

    expect(setProductos).toHaveBeenCalledOnce();

    // Cambiar a pestaña Productos y eliminar
    fireEvent.click(screen.getByRole('button', { name: /Productos \(2\)/i }));
    const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar/i });
    fireEvent.click(botonesEliminar[0]);

    expect(confirmSpy).toHaveBeenCalledOnce();
    expect(setProductos).toHaveBeenCalledTimes(2);
    confirmSpy.mockRestore();
  });

  it('restringe vistas y oculta acciones de edición para el rol Vendedor', () => {
    render(
      <AdminDashboard
        productos={productosMock}
        setProductos={vi.fn()}
        usuarios={[]}
        ordenes={ordenesMock}
        usuarioActual={{ nombre: 'Vendedor', rol: 'vendedor' }}
      />
    );

    expect(screen.getByText('Consulta de Productos y Órdenes')).toBeInTheDocument();

    // No debe ver controles exclusivos de Administrador
    expect(screen.queryByRole('button', { name: /Agregar Nuevo Producto/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Métrica y Resumen/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Categorías/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Usuarios/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Reportes/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Editar/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Eliminar/i })).not.toBeInTheDocument();

    // Sí puede ver detalle de producto y detalle de órdenes
    fireEvent.click(screen.getAllByRole('button', { name: /Detalle/i })[0]);
    expect(screen.getByText('Detalle de Producto #1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '✕' }));

    fireEvent.click(screen.getByRole('button', { name: /Boletas \/ Órdenes \(1\)/i }));
    fireEvent.click(screen.getByRole('button', { name: /Ver Detalle/i }));
    expect(screen.getByText('Detalle de Boleta #20261234')).toBeInTheDocument();
  });
  it('permite navegar a Categorías y Reportes como Administrador', () => {
    render(
      <AdminDashboard
        productos={productosMock}
        setProductos={vi.fn()}
        usuarios={[]}
        ordenes={ordenesMock}
        usuarioActual={{ nombre: 'Admin', rol: 'admin' }}
      />
    );

    // Probar pestaña Categorías y creación de una nueva
    fireEvent.click(screen.getByRole('button', { name: /Categorías/i }));
    expect(screen.getByText(/Gestión de Categorías/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Nueva categoría/i), {
      target: { value: 'Estufas' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Agregar Categoría/i }));
    expect(screen.getByText('Estufas')).toBeInTheDocument();

    // Probar pestaña Reportes
    fireEvent.click(screen.getByRole('button', { name: /Reportes/i }));
    expect(screen.getByText('Reportes de Ventas e Inventario')).toBeInTheDocument();
  });
});
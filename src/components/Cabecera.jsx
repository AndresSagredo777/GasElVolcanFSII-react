import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Cabecera({ cantidadTotal = 0 }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <header className="cabecera">
            <Link className="marca" to="/" onClick={cerrarMenu}>
                Gas El Volcan
            </Link>

            <button 
                className={`boton-menu ${menuAbierto ? 'activo' : ''}`} 
                onClick={toggleMenu}
                aria-label="Abrir o cerrar navegación"
            >
                <span className="linea-menu"></span>
                <span className="linea-menu"></span>
                <span className="linea-menu"></span>
            </button>

            <nav>
                <ul className={`menu ${menuAbierto ? 'menu-abierto' : ''}`}>
                    <li>
                        <NavLink to="/" onClick={cerrarMenu}>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/productos" onClick={cerrarMenu}>Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/nosotros" onClick={cerrarMenu}>Nosotros</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cobertura" onClick={cerrarMenu}>Cobertura</NavLink>
                    </li>
                    <li>
                        <NavLink to="/carrito" onClick={cerrarMenu} style={{ fontWeight: 'bold', color: 'var(--color-primario)' }}>
                            🛒 Carrito ({cantidadTotal})
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Cabecera;
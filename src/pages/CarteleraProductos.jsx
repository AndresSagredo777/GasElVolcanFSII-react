// src/pages/CarteleraProductos.jsx
import React, { useState } from "react";
import Productos from "../components/Productos";
import { productos } from "../data/productos";

function CarteleraProductos({ agregar }) {
    const [categoria, setCategoria] = useState("Todas");

    // Filtrado reactivo según la categoría seleccionada
    const productosFiltrados = categoria === "Todas"
        ? productos
        : productos.filter((item) => item.categoria === categoria);

    return (
        <div className="container py-4">
            <h2 className="mb-3 fw-bold">Catálogo de Productos</h2>

            {/* Selector de Filtro por Categoría */}
            <div className="row mb-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <label htmlFor="filtro-categoria" className="form-label fw-semibold">
                        Filtrar por categoría:
                    </label>
                    <select
                        id="filtro-categoria"
                        className="form-select"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="Todas">Todas las categorías</option>
                        <option value="Cilindros de Gas">Cilindros de Gas</option>
                        <option value="Accesorios y Reguladores">Accesorios y Reguladores</option>
                    </select>
                </div>
            </div>

            {/* Grilla de Productos */}
            <div className="row g-4">
                {productosFiltrados.map((item) => (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                        <Productos
                            producto={item}
                            agregar={agregar}
                        />               
                    </div>
                ))}
            </div>
        </div>
    );
}   

export default CarteleraProductos;
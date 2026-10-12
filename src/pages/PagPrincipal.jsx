// src/pages/PagPrincipal.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function PagPrincipal() {
    return (
        <main id="contenido-principal" className="container py-4">
            {/* Sección Presentación */}
            <section className="presentacion mb-5 text-center">
                <p className="etiqueta text-uppercase text-muted fw-semibold">Gas a domicilio</p>
                <h1 className="fw-bold display-5">Gas en tu puerta</h1>
                <p className="lead text-secondary">
                    Distribución de cilindros de gas licuado con entrega rápida y segura.
                </p>
                <Link className="btn btn-warning text-white fw-bold btn-lg mt-2" to="/productos">
                    Ver productos
                </Link>
            </section>

            {/* Sección Productos Destacados */}
            <section aria-labelledby="titulo-productos" className="mb-5">
                <h2 id="titulo-productos" className="mb-4 fw-bold">Nuestros productos</h2>
                <div className="row g-4">
                    <div className="col-12 col-sm-6 col-md-3">
                        <article className="card h-100 shadow-sm border-0 p-3 text-center">
                            <img 
                                src="assets/cilindro5kg.jpg" 
                                alt="Cilindro de gas de 5 kilogramos" 
                                className="card-img-top mx-auto"
                                style={{ height: '130px', objectFit: 'contain' }}
                            />
                            <div className="card-body d-flex flex-column p-2">
                                <h5 className="card-title fw-bold fs-6">Cilindro 5 kg</h5>
                                <p className="card-text small text-muted flex-grow-1">
                                    Para uso residencial (cocina, calefacción pequeña).
                                </p>
                                <Link className="btn btn-outline-warning btn-sm fw-bold mt-2" to="/productos">
                                    Ver detalle
                                </Link>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3">
                        <article className="card h-100 shadow-sm border-0 p-3 text-center">
                            <img 
                                src="assets/cilindro15kg.png" 
                                alt="Cilindro de gas de 15 kilogramos" 
                                className="card-img-top mx-auto"
                                style={{ height: '130px', objectFit: 'contain' }}
                            />
                            <div className="card-body d-flex flex-column p-2">
                                <h5 className="card-title fw-bold fs-6">Cilindro 15 kg</h5>
                                <p className="card-text small text-muted flex-grow-1">
                                    Mayor capacidad para hogares de alto consumo o locales pequeños.
                                </p>
                                <Link className="btn btn-outline-warning btn-sm fw-bold mt-2" to="/productos">
                                    Ver detalle
                                </Link>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3">
                        <article className="card h-100 shadow-sm border-0 p-3 text-center">
                            <img 
                                src="assets/detectorgas.png" 
                                alt="Detector de gas a batería" 
                                className="card-img-top mx-auto"
                                style={{ height: '130px', objectFit: 'contain' }}
                            />
                            <div className="card-body d-flex flex-column p-2">
                                <h5 className="card-title fw-bold fs-6">Detector de gas</h5>
                                <p className="card-text small text-muted flex-grow-1">
                                    Sensor electroquímico. Alarma sonora y visual ante fugas.
                                </p>
                                <Link className="btn btn-outline-warning btn-sm fw-bold mt-2" to="/productos">
                                    Ver detalle
                                </Link>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-sm-6 col-md-3">
                        <article className="card h-100 shadow-sm border-0 p-3 text-center">
                            <img 
                                src="assets/kitcompleto.png" 
                                alt="Kit de conexión completo" 
                                className="card-img-top mx-auto"
                                style={{ height: '130px', objectFit: 'contain' }}
                            />
                            <div className="card-body d-flex flex-column p-2">
                                <h5 className="card-title fw-bold fs-6">Kit conexión completo</h5>
                                <p className="card-text small text-muted flex-grow-1">
                                    Todo lo necesario para instalar un cilindro nuevo.
                                </p>
                                <Link className="btn btn-outline-warning btn-sm fw-bold mt-2" to="/productos">
                                    Ver detalle
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Aviso Informativo */}
            <aside className="aviso alert alert-warning p-4 text-center rounded-3" aria-labelledby="titulo-aviso">
                <h2 id="titulo-aviso" className="h4 fw-bold">¿Quieres hacer tu pedido?</h2>
                <p className="mb-0">
                    Explora nuestro catálogo interactivo para seleccionar y agregar tus cilindros directamente al carrito.
                </p>
            </aside>
        </main>
    );
}

export default PagPrincipal;
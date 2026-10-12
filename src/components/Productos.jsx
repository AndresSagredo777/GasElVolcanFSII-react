import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Productos({ producto, agregar }) {
    const sinStock = producto.stock === 0;

    return (
        <Card className="h-100 shadow-sm border-0">
            {producto.imagen && (
                <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{ height: '160px', objectFit: 'contain', padding: '15px' }}
                />
            )}
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-5 fw-bold">{producto.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">{producto.categoria}</Card.Subtitle>
                
                <Card.Text className="text-secondary small flex-grow-1">
                    {producto.descripcion}
                </Card.Text>

                <div className="my-2">
                    <div className="fw-bold fs-4 text-primary">
                        ${producto.precio ? producto.precio.toLocaleString('es-CL') : 0}
                    </div>
                    <div className="small mt-1">
                        {sinStock ? (
                            <span className="text-danger fw-bold">Agotado</span>
                        ) : (
                            <span className="text-muted">Stock: {producto.stock} u.</span>
                        )}
                    </div>
                </div>

                <Button
                    variant="warning"
                    className="text-white fw-bold w-100 mt-2"
                    onClick={() => agregar(producto)}
                    disabled={sinStock}
                >
                    {sinStock ? 'Sin stock' : 'Añadir'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Productos;
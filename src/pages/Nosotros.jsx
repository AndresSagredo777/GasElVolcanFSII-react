import React from 'react';

function Nosotros() {
  return (
    <main className="container py-4">
      <h1 className="fw-bold mb-3">Sobre Nosotros</h1>
      <p className="lead text-secondary">
        En <strong>Gas El Volcan</strong> llevamos más de 10 años entregando energía segura y confiable a los hogares y comercios de nuestra zona.
      </p>
      <div className="row mt-4 g-3">
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded bg-light">
            <h4>Nuestra Misión</h4>
            <p className="mb-0">
              Garantizar un abastecimiento rápido, seguro y con cilindros normados para cada uno de nuestros clientes.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded bg-light">
            <h4>Puntualidad y Calidad</h4>
            <p className="mb-0">
              Contamos con una flota propia distribuida estratégicamente para ofrecer los mejores tiempos de entrega.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
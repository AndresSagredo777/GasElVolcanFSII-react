function PagPrincipal(){
    return(
    <main id="contenido-principal">
        <section className="presentacion">
            <p class="etiqueta">Gas a domicilio</p>
            <h1>Gas en tu puerta</h1>
            <p>Distribución de cilindros de gas licuado con entrega rápida y segura.</p>
            {/*<a class="boton" href="productos.html">Ver productos</a>*/}
        </section>

      <section aria-labelledby="titulo-productos">
            <h2 id="titulo-productos">Nuestros productos</h2>
            <div className="grilla-tarjetas">
                <article class="tarjeta">
                    <img src="assets/img/cilindro5kg.jpg" alt="Cilindro de gas de 5 kilogramos"/>
                    <h3>Cilindro 5 kg</h3>
                    <p>Para uso residencial (cocina, calefacción pequeña).</p>
                    {/*<a class="boton" href="productos.html">Ver detalle</a>*/}
                </article>

                <article className="tarjeta">
                    <img src="assets/img/cilindro15kg.png" alt="Cilindro de gas de 15 kilogramos"/>
                    <h3>Cilindro 15 kg</h3>
                    <p>Mayor capacidad para hogares de alto consumo o locales pequeños.</p>
                    {/*<a class="boton" href="productos.html">Ver detalle</a>*/}
                </article>

                <article className="tarjeta">
                    <img src="assets/img/detectorgas.png" alt="Detector de gas a batería"/>
                    <h3>Detector de gas a batería</h3>
                    <p>Sensor electroquímico. Alarma sonora y visual ante fugas.</p>
                    {/*<a class="boton" href="productos.html">Ver detalle</a>*/}
                </article>

                <article className="tarjeta">
                    <img src="assets/img/kitcompleto.png" alt="Kit de conexión completo"/>
                    <h3>Kit conexión completo</h3>
                    <p>Todo lo necesario para instalar un cilindro nuevo.</p>
                    {/*<a class="boton" href="productos.html">Ver detalle</a>*/}
                </article>
            </div>
        </section>

        <aside className="aviso" aria-labelledby="titulo-aviso">
            <h2 id="titulo-aviso">¿Quieres hacer tu pedido?</h2>
            <p>Muy pronto habilitaremos pedidos en línea. Mientras tanto, contáctanos por teléfono o WhatsApp.</p>
        </aside>
    </main>
    );
}
export default PagPrincipal;
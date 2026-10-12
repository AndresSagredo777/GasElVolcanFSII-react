function Productos({producto, agregar}){
    return(
        <article className="lista-productos">
            <div className="cuerpo-productos">
                <h3>{producto.nombre}</h3>
                <p>Categoria: {producto.categoria}</p>
                <p>${producto.precio}</p>
                <p>{producto.descripcion}</p>
                <p>Stock: {producto.cantidad}</p>
                <button
                    className="boton-añadir"
                    onClick={() => agregar(producto)}
                >
                Añadir
                </button>
            </div>
        </article>
    );
}
export default Productos;
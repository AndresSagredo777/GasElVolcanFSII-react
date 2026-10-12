import Productos from "../components/Productos";

function CarteleraProductos({producto, agregar}){
    return(
        <div className="row g-4">
            {productos.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                    <Productos
                    producto={item}
                    agregar={agregar}
                    />               
                </div>
            ))}
        </div>
    );
}   
export default CarteleraProductos;
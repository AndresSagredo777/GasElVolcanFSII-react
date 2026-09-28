import {Container , Nav, Navbar} from "react-bootstrap"
import Productos from "../pages/Productos";

function Navegacion(){
    return(    
    <Navbar expand="md" bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand href="#inicio">Gas El Volcan</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu-principal" />
            <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
                <Nav.Link href="#inicio">Inicio</Nav.Link>
                <Nav.Link href="#nosotros">Nosotros</Nav.Link>
                <Nav.Link href="#productos">Productos</Nav.Link>
                <Nav.Link href="#cobertura">Cobertura</Nav.Link>
                <Nav.Link href="#carrito">Carrito</Nav.Link>
                <Nav.Link href="#ingresar">Ingresar</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
export default Navegacion;

import {Container , Nav, Navbar} from "react-bootstrap"
import { NavLink } from "react-router-dom";

function Navegacion(){
    return(    
    <Navbar expand="md" bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand href="#inicio">Gas El Volcan</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu-principal" />
            <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
                <NavLink className="nav-link" to="/">Inicio</NavLink>
                <NavLink className="nav-link" to="/productos">Productos</NavLink>
                <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
                <NavLink className="nav-link" to="/cobertura">Cobertura</NavLink>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
export default Navegacion;

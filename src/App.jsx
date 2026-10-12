import './App.css'
import {Route, Routes} from "react-router-dom"
import PagPrincipal from './pages/PagPrincipal';
import Navegacion from './components/Navegacion';
import Nosotros from './pages/Nosotros'
import Cobertura from './pages/Cobertura'
import Cartelera from './pages/CarteleraProductos'
import Error from './pages/NotFound404'

function App() {
  return (
    <>
    <Navegacion/>
    <Routes>
      <Route path="/" element={<PagPrincipal />} />
      <Route path="/productos" element={<Cartelera />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/cobertura" element={<Cobertura />} />
      <Route path="*" element={<Error />} />
    </Routes>
    </>
  );
}
export default App

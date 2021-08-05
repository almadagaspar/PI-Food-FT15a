import { Link } from 'react-router-dom'
import "./Landing.css"    // Importo los estilos para este componente.


function Landing() {   // Primer componente que se renderizará.
    return (
        <div className="Landing">
            <h1>Food</h1>
            <Link to='/home'>
                <button> ENTRAR </button>   {/* Boton que me enviará al componente 'Home', mediante el cambio en la ruta que hace el 'Link' */}
            </Link>
        </div>
    );

}


export default Landing;
import { Link } from 'react-router-dom'
import "./Landing.css"    


function Landing() {   
    return (
        <div className="Landing">
            <h1>Food</h1>
            <Link to='/home'>
                <button> ENTRAR </button>  
            </Link>
        </div>
    );

}


export default Landing;
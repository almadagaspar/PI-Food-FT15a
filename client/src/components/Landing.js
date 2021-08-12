import { Link } from 'react-router-dom'
import food from "../imgs/food.jpg"
import s from "./Landing.module.css"    


function Landing() {   
    return (
        <div className={s.landing}>
            <img className={s.title} src={food} />
            <Link to='/home'>
                <button> ENTRAR </button>  
            </Link>
        </div>
    );
};


export default Landing;
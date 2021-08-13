import { Link } from 'react-router-dom'
import food from "../imgs/food.jpg"
import s from "./Landing.module.css"


function Landing() {
    return (
        <div className={s.landing}>
            <div className={s.titleAndButton}>
                <img src={food} />
                <Link to='/home'>
                    <button> ENTER </button>
                </Link>
            </div>
        </div>
    );
};


export default Landing;
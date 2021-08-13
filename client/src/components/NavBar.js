import React from 'react';
import { NavLink } from 'react-router-dom';
import food from "../imgs/food_small.png"
import s from './NavBar.module.css';


export default function NavBar() {    // Mi barra de navegación.
    return (
        <header className={s.navbar}>
            <img src={food} />
            <nav>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/addrecipe" >Add a Recipe</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

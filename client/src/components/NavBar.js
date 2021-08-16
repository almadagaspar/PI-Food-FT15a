// import React from 'react';
import { NavLink } from 'react-router-dom';
import food from "../imgs/food_small.png"
import s from './NavBar.module.css';


export default function NavBar() {    // Mi barra de navegación.
    return (
        <header >
            <img src={food} alt="" />
            <nav>
                <NavLink exact to="/home" className={s.navItem} >
                    <span>Home</span>
                </NavLink>
                <NavLink to="/addrecipe" className={s.navItem} >
                    <span>Add a Recipe</span>
                </NavLink>
            </nav>
        </header>
    )
}

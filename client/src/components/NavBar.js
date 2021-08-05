import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


export default function NavBar() {    // Mi barra de navegación.
    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/addrecipe" >Add Recipe</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

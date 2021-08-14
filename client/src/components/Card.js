import React from "react";
import { Link } from 'react-router-dom';
import imageNotAvailable from "../imgs/imageNotAvalible.jpg"
import s from './Card.module.css'

export default function Card({ id, image, name, score, diets }) {  // Accedo mediante deestructuring a las props que lleguen a este componente.
  return (
    <div className={s.card}>
      <Link to={'/details/' + id}>
        <img src={image ? image : imageNotAvailable} alt="" /><br />
        <span>Name: {name}</span><br />
        <span>Score: {score}</span><br />
        <span>Diets: </span><br />
        <ul>
          {
            diets && diets.map((d, i) => {        /* Muestro todos las dietas de la receta */
              return (
                <li key={i}>{d}</li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}
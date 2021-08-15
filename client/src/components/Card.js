import React from "react";
import { Link } from 'react-router-dom';
import imageNotAvailable from "../imgs/imageNotAvalible.jpg"
import s from './Card.module.css'

export default function Card({ id, image, name, score, diets }) {  // Accedo mediante deestructuring a las props que lleguen a este componente.
  return (
    <div className={s.card}>
      <div className={s.upper_details}>
        <Link to={'/details/' + id}>
          <img src={image ? image : imageNotAvailable} alt="" />
        </Link>
        <div className={s.right_side}>
          <div className={s.score}>Score: {score}</div>
          <div className={s.diets_title}>Diets:</div>
          <div className={s.diets}>
            {
              diets.length ? diets.map((d, i) => {        /* Muestro todos las dietas de la receta */
                return (
                  <span key={i}>• {d}</span>
                )
              })
                : <span>There are no diets to show.</span>
            }
          </div>
        </div>
      </div>
      <div className={name.length < 50 ? s.name : s.name_long}>{name}</div>


    </div>
  );
}
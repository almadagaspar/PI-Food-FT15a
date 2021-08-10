import React from "react";
import imageNotAvailable from  "../imgs/imageNotAvailable.jpg"

export default function Card({ image, name, score, diets }) {  // Accedo mediante deestructuring a las props que lleguen a este componente.
  return (
    <React.Fragment>
      <img src={image ? image : imageNotAvailable} alt="" width="280px" height="200px" />  
      <h2>{score}</h2>
      <h2>{name}</h2>                                         
      {
        diets && diets.map((d,i) => {        /* Muestro todos las dietas de la receta */
          return (
              <h4 key={i}>{d}</h4>
          )
        })
      }
    </React.Fragment>
  );
}
import React from "react";
import imageNotAvailable from  "../imgs/imageNotAvailable.jpg"

export default function Card({ image, name, diets }) {  // Accedo mediante deestructuring a las props que envian a este componente.
  return (
    <React.Fragment>
      <img src={image ? image : imageNotAvailable} alt="" width="200px" height="250px" />  {/* Muestro la imágen de la receta */}
      <h3>{name}</h3>                                         {/* Muestro el nombre de la receta */}
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
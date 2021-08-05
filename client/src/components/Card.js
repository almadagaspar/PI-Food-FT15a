import React from "react";


export default function Card({ image, name, diets }) {  //// Accedo mediante deestructuring a las props que envian a este componente.
  return (
    <React.Fragment>
      <img src={image} alt="Image not found" width="200px" height="250px" />  {/* Muestro la imágen de la receta */}
      <h3>{name}</h3>                                         {/* Muestro el nombre de la receta */}
      {
        diets && diets.map(d => {                       {/* Muestro todos los dietas de la receta */}
          return (
              <h4>{d}</h4>
          )
        })
      }
    </React.Fragment>
  );
}
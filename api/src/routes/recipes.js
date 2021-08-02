const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.


// Ej:  http://localhost:3001/recipes?query=egg
// Ej:  http://localhost:3001/recipes

router.get('/', async (req, res) => {
    // Si se envió del Front un nombre de receta para la busqueda, retorno las 100 recetas cuyo nombre incluya la palabra recibida.
    if (req.query.name) {
        //// ¡¡¡ FALTARIA CONSIDERAR E INCLUIR LOS JUEGOS DE MI BDD !!!!
        recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${req.query.name}`)

        const recipesToSend = recipesAPI.data.results && recipesAPI.data.results.map(recipe => {
            // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
            let extraDiets = [];
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) extraDiets.push('vegetarian');
            if (recipe.vegan && !recipe.diets.includes('vegan')) extraDiets.push('vegan');
            if (recipe.glutenFree && !recipe.diets.includes('gluten free')) extraDiets.push('gluten free');

            return {      // De cada receta obtenida, solo debo enviar: la imágen, el nombre y las dietas a las que pertenece. 
                id: recipe.id,    // Envio el 'id' tambien para poder despues ver los detalles de una receta al hacerle click.
                image: recipe.image,
                name: recipe.title,
                diets: extraDiets.concat(recipe.diets)  // Junto todas las dietas de esta receta.
            }
        })

    
        if (recipesToSend.length) return res.json(recipesToSend)
        res.status(404).send({ error: 'No se encontraron recetas con ese nombre' })


    } else {   // Si NO se envió del Front un nombre de receta para la busqueda, retorno las 100 primeras recetas que me envie la API externa.
       
        // Para que la cantidad de recetas devueltas por la API sea 100 en lugar de solo 10, agrego el flag: &number=100
        // Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta, agrego el flag: &addRecipeInformation=true
        recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

        const recipesToSend = recipesAPI.data.results.map(recipe => {
            // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
            let extraDiets = [];
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) extraDiets.push('vegetarian');
            if (recipe.vegan && !recipe.diets.includes('vegan')) extraDiets.push('vegan');
            if (recipe.glutenFree && !recipe.diets.includes('gluten free')) extraDiets.push('gluten free');

            return {      // De cada receta obtenida, solo debo enviar: la imágen, el nombre y las dietas a las que pertenece. 
                id: recipe.id,    // Envio el 'id' tambien para poder despues ver los detalles de una receta al hacerle click.
                image: recipe.image,
                name: recipe.title,
                diets: extraDiets.concat(recipe.diets)  // Junto todas las dietas de esta receta.
            }
        })
        return res.json(recipesToSend);    //// Respondo con un array con 100 juegos (imágen, nombre y sus géneros)
    }
})


module.exports = router;
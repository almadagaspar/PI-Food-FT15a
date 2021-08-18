const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.
const { Recipe, Diet } = require('../db.js');     // Importo los modelos que necesito mediante destructuring.

// Ej:  http://localhost:3001/recipes?name=apple
// Ej:  http://localhost:3001/recipes



router.get('/', async (req, res) => {
    if (req.query.name) {      // Si se envió un nombre de receta para la busqueda, retorno las recetas de la API externa y de mi DB cuyo nombre incluya la palabra recibida.
        const dbRecipes = await Recipe.findAll({
            attributes: ['id', 'name', 'score'],     // Solo quiero estos campos.
            include: {                              // Incluto las dietas relacionadas a esta receta.
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] }      // Esto evita que se incluyan los IDs de la tabla intermedia.
            }
        });
        const dbRecipesByName = dbRecipes.filter(recipe => recipe.name.toLowerCase().includes(req.query.name.toLowerCase()))


        //  Cambio la estructura de la propiedad incluida 'diets' para que sea un array de strings en lugar de un array de objetos. 
        //  "diets": [ { "name": "Ketogenic" }, { "name": "Pescetarian" } ]       =====>     "diets": ["Ketogenic", "Pescetarian" ]
        const dbRecipesFormated = formatChange(dbRecipesByName);


        // let apiRecipes = []
        try {
            var apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${req.query.name}`)
        } catch (error) {
            console.log("Se genero un error en el back al buscar por nombre", error)
        }

        const apiRecipesWithDiets = apiRecipes.data.results && apiRecipes.data.results.map(recipe => {
            // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
            let initialDiets = [];
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) initialDiets.push('vegetarian');
            if (recipe.vegan && !recipe.diets.includes('vegan')) initialDiets.push('vegan');
            if (recipe.glutenFree && !recipe.diets.includes('gluten free')) initialDiets.push('gluten free');

            return {      // De cada receta obtenida, solo debo enviar: la imágen, el nombre y las dietas a las que pertenece. 
                id: recipe.id,    // Envio el 'id' tambien para poder despues ver los detalles de una receta al hacerle click.
                image: recipe.image,
                name: recipe.title,
                score: recipe.spoonacularScore,
                diets: initialDiets.concat(recipe.diets)  // Junto todas las dietas de esta receta.
            }
        })
        const recipesToSend = dbRecipesFormated.concat(apiRecipesWithDiets);

        if (recipesToSend.length) return res.json(recipesToSend)
        res.status(404).json({ error: 'No hay recetas con ese nombre' })

    } else {   // Si NO se envió del Front un nombre de receta para la busqueda, retorno las recetas de mi DB, junto con las 100 primeras recetas que me envie la API externa.


        const dbRecipes = await Recipe.findAll({      // Busco todas las dietas de mi base de datos.
            attributes: ['id', 'name', 'score'],     // Solo quiero estos campos.
            include: {                              // Incluto las dietas relacionadas a esta receta.
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] } // Esto evita que se incluyan los IDs de la tabla intermedia.
            }
        })

        //  Cambio la estructura de la propiedad incluida 'diets' para que sea un array de strings en lugar de un array de objetos. 
        //  "diets": [ { "name": "Ketogenic" }, { "name": "Pescetarian" } ]       =====>     "diets": ["Ketogenic", "Pescetarian" ]
        const dbRecipesFormated = formatChange(dbRecipes);


        // Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta, agrego el flag: &addRecipeInformation=true
        const recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

        const recipesToSend = recipesAPI.data.results.map(recipe => {
            // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
            let initialDiets = [];
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) initialDiets.push('vegetarian');
            if (recipe.vegan && !recipe.diets.includes('vegan')) initialDiets.push('vegan');
            if (recipe.glutenFree && !recipe.diets.includes('gluten free')) initialDiets.push('gluten free');

            return {      // De cada receta obtenida, solo debo enviar: la imágen, el nombre y las dietas a las que pertenece. 
                id: recipe.id,    // Envio el 'id' tambien para poder despues ver los detalles de una receta al hacerle click.
                image: recipe.image,
                name: recipe.title,
                score: recipe.spoonacularScore,
                diets: initialDiets.concat(recipe.diets)  // Junto todas las dietas de esta receta.
            }
        })

        // Respondo con las recetas encontradas en mi base de datos concatenadas con las encontradas en la API.
        return res.json(dbRecipesFormated.concat(recipesToSend));
    }
})



//  "diets": [ { "name": "Ketogenic" }, { "name": "Pescetarian" } ]       =====>     "diets": ["Ketogenic", "Pescetarian" ]
function formatChange(recipesToFormat) {
    let dbRecipesFormated = [];

    for (let i = 0; i < recipesToFormat.length; i++) {
        let recipeFormated = {         // Esta variable representa cada elemento del array de recetas encontradas en la base de datos
            id: recipesToFormat[i].id,
            name: recipesToFormat[i].name,
            score: recipesToFormat[i].score,
            diets: recipesToFormat[i].diets && recipesToFormat[i].diets.map(d => d.name)
        }
        dbRecipesFormated.push(recipeFormated)
    }

    return dbRecipesFormated;
}



module.exports = router;


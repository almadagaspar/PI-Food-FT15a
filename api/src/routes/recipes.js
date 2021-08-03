const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.

const { Recipe, Diet } = require('../db.js');     // Importo los modelos que necesito mediante destructuring.


// Ej:  http://localhost:3001/recipes?name=apple
// Ej:  http://localhost:3001/recipes

router.get('/', async (req, res) => {
    // Si se envió del Front un nombre de receta para la busqueda, retorno las 100 recetas cuyo nombre incluya la palabra recibida.
    if (req.query.name) {
        //// ¡¡¡ FALTARIA CONSIDERAR E INCLUIR LAS RECETAS DE MI BDD !!!!
        const dbRecipe = await Recipe.findAll({
            // where: {
            //     name: req.query.name
            // },
            attributes: ['id','name', 'createdInDb']

        });

        console.log('RECETAS DE LA BASE DE DATOS',dbRecipe)

        let recipeByName = await dbRecipe.filter(recipe => recipe.name.toLowerCase().includes(req.query.name.toLocaleLowerCase()))

        recipeByName = recipeByName.recipe.dataValues
        console.log('RECETAS DE LA BASE DE DATOS FILTRADAS POR NOMBRE',recipeByName)






        const recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${req.query.name}`)

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


        if (recipesToSend.length) return res.json(recipeByName.concat(recipesToSend))
        res.status(404).send({ error: 'No se encontraron recetas con ese nombre' })

    } else {   // Si NO se envió del Front un nombre de receta para la busqueda, retorno las 100 primeras recetas que me envie la API externa.

        const dbRecipes = await Recipe.findAll({      // Busco todas las dietas de mi base de datos.
            attributes: ['id', 'name', 'createdInDb'],    // Solo quiero estos campos.
            include: {                                       // Incluto las dietas relacionadas a esta receta.
                model: Diet,
                attributes: ['name'],
                through: { attributes: [] } // Esto evita que se incluyan los IDs de la tabla intermedia.
            }
        })


        //  Si encontré recetas en mi base de datos, cambio la estructura de la propiedad incluida 'diets' para que sea un array de strings en lugar de un array de objetos. 
        //  "diets": [ { "name": "Ketogenic" }, { "name": "Pescetarian" } ]       =====>     "diets": ["Ketogenic", "Pescetarian" ]
        let dbRecipesFormated = [];
        // if (dbRecipes.length) {   // BORRAR ESTE FOR SI NO HAY ERRORES CON MI BASE DE DATOS VACIA.
        for (let i = 0; i < dbRecipes.length; i++) {
            let recipeFormated = {         // Esta variable representa cada elemento del array de recetas encontradas en la base de datos
                id: dbRecipes[i].id,
                name: dbRecipes[i].name,
                createdInDb: dbRecipes[i].createdInDb,
                diets: dbRecipes[i].diets && dbRecipes[i].diets.map(d => d.name)
            }
            dbRecipesFormated.push(recipeFormated)
        }
        // }

        // Para obtener mayor información sobre las recetas, como por ejemplo el tipo de dieta, agrego el flag: &addRecipeInformation=true
        const recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

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

        // Respondo con las recetas encontradas en mi base de datos concatenadas con las encontradas en la API.
        return res.json(dbRecipesFormated.concat(recipesToSend));
    }
})


module.exports = router;
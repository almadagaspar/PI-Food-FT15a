const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.

const { Recipe, Diet } = require('../db.js');     // Importo los modelos que necesito mediante destructuring.

// Ej: http://localhost:3001/recipe/3245


router.get('/:id', async (req, res) => {
    if (req.params.id.includes('-')) {   // Si el id de la receta que debo buscar contiene un guión, debo buscarlo en mi base de datos.

        try {
            let dbRecipe = await Recipe.findByPk(req.params.id,  // Busco en mi base de datos una receta con el id recibido.
                {
                    // Incluir a la receta encontrada, el nombre de las dietas a las que está relacionada, en una propieda 'diets'. 
                    include: {
                        model: Diet,
                        attributes: ['name'],
                        through: { attributes: [] } // Esto evita que se incluyan los IDs de la tabla intermedia.
                    }
                })

            //  Si encontré una receta con el id recibido, cambio la estructura de la propiedad incluida 'diets' para que sea un array de strings en lugar de un array de objetos.
            //  "diets": [ { "name": "Ketogenic" }, { "name": "Pescetarian" } ]       =====>     "diets": ["Ketogenic", "Pescetarian" ]
            if (dbRecipe) {
                const recipeToSend = {
                    id: dbRecipe.id,
                    name: dbRecipe.name,
                    summary: dbRecipe.summary,
                    score: dbRecipe.score,
                    healthScore: dbRecipe.healthScore,
                    instructions: dbRecipe.instructions,
                    // createdInDb: dbRecipe.createdInDb,     // BORRAR SI AVANZANDO EN EL PI, NO RESULTA NECESARIO.
                    diets: dbRecipe.diets && dbRecipe.diets.map(d => d.name)
                }
                return res.json(recipeToSend) // Envio al Front la receta encontrada.
            }
            // Si NO encontre una receta con ese id, envío el mensaje correspondiente.
            res.status(404).json({ error: 'No se encontró una receta con ese id en la base de datos.' })

        } catch (error) {
            // Si el id recibido no tiene el formato de UUID a pesar de tener un '-', envío el mensaje correspondiente.
            res.status(404).json({ error: 'El id recibido no es valido.' })
        }

    } else {    // Si el id recivido NO contiene un guión, debo buscarlo en la API externa.

        try {   // Uso try-catch por si desde el Front se solicita detalles de una receta con un id que no existe en la API externa.
            const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${API_KEY}`)
            const recipe = recipeAPI.data;

            // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
            let initialDiets = [];
            if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) initialDiets.push('vegetarian');
            if (recipe.vegan && !recipe.diets.includes('vegan')) initialDiets.push('vegan');
            if (recipe.glutenFree && !recipe.diets.includes('gluten free')) initialDiets.push('gluten free');

            // Con la información recibida de la API externa, creo la receta a enviar usando solo la informacion requerida.
            const recipeToSend = {
                image: recipe.image,
                name: recipe.title,
                score: recipe.spoonacularScore,
                healthScore: recipe.healthScore,
                dishTypes: recipe.dishTypes,
                summary: recipe.summary,
                instructions: recipe.instructions,
                diets: initialDiets.concat(recipe.diets),  // Junto todas las dietas de esta receta.
            }
            res.json(recipeToSend);

        } catch (error) {   // Si NO se encontró una receta con el id recibido del Front, envío el mensaje correspondiente.
            return res.status(404).json({ error: 'No se encontró una receta con ese id en la API externa.' })
        }
    }
})




router.post('/', async (req, res) => {     // Creo una receta en mi base de datos, con los datos que llegan desde el Front, enviados por body.
    const { name, summary, score, healthScore, instructions, diets } = req.body;    // Tomo del body la información que necesito para crear la nueva receta.

    // Agrego a la tabla 'recipes' una nueva receta. En este caso NO es necesario
    // enviar un valor para el campo 'createdInDb' ya que se autocompleta automaticamente en 'true'.
    const newRecipe = await Recipe.create({
        name: name,
        summary: summary,
        score: score,
        healthScore: healthScore,
        instructions: instructions
        // createdInDb: createdInDb    // BORR
    })

    await newRecipe.addDiets(diets);     // Agrego en la tabla intermedia 'recipe_diet' un registro (recipeId y dietID) por cada dieta a la que pertenece esta nueva receta.
    res.json(newRecipe)     // Respondo con toda la información de la nueva receta creada en la DB.

})


module.exports = router;
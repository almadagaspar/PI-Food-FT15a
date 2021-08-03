const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.

const { Recipe } = require('../db.js');     //// Importo el modelo que necesito haciendo un destructuring.


// Ej: http://localhost:3001/recipe/3245

router.get('/:id', async (req, res) => {

    // ¡¡¡ FALTARIA CONSIDERAR LAS RECETAS DE MI BDD !!!!

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
            //  ES CORRECTO EL MODO EN EL QUE INCLUI LOS TIPO DE DIETA ASOCIADOS???
        }
        res.json(recipeToSend);

    } catch (error) {   // Si NO se encontró una receta con el id enviado del Front. 
        return res.status(404).json({ error: 'No se encontró una receta con ese id' })
    }
})




router.post('/', async (req, res) => {

    const { name, summary, score, healthScore, instructions, diets } = req.body;

    // En este caso NO es necesario enviar un valor para el campo 'createdInDb' ya que se autocompleta automaticamente en 'true'.
    const newRecipe = await Recipe.create({
        name: name,
        summary: summary,
        score: score,
        healthScore: healthScore,
        instructions: instructions,
    })
    await newRecipe.addDiets(diets);
    
    res.json(newRecipe)

})







module.exports = router;
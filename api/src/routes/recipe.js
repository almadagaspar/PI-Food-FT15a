const { Router } = require('express');
const router = Router();
const axios = require('axios');

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.


// Ej: http://localhost:3001/recipe/3245

router.get('/:id', async (req, res) => {

    // ¡¡¡ FALTARIA CONSIDERAR LAS RECETAS DE MI BDD !!!!
    // ¿Realmente es necesario dishTypes? No aparece en la ruta principal, ni en la de creacion de receta, solo en la de detalle.


    const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${API_KEY}`)
    let recipe = recipeAPI.data;

    // Las dietas a las que pertenece cada receta estan en dos lugares distintos, por lo que tengo que unirlas pero evitando que se repitan.
    let extraDiets = [];
    if (recipe.vegetarian && !recipe.diets.includes('vegetarian')) extraDiets.push('vegetarian');
    if (recipe.vegan && !recipe.diets.includes('vegan')) extraDiets.push('vegan');
    if (recipe.glutenFree && !recipe.diets.includes('gluten free')) extraDiets.push('gluten free');


    const recipeToSend = {
        image: recipe.image,
        name: recipe.title,
        summary: recipe.summary,
        score: recipe.spoonacularScore,
        healthScore: recipe.healthScore,
        instructions: recipe.instructions,
        diets: extraDiets.concat(recipe.diets),  // Junto todas las dietas de esta receta.
        //  ES CORRECTO EL MODO EN EL QUE INCLUI LOS TIPO DE DIETA ASOCIADOS???
    }

    res.json(recipeToSend);

})





router.post('/', async (req, res) => {

    // Nombre
    // Resumen del plato
    // Puntuación
    // Nivel de "comida saludable"
    // Paso a paso
    // [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
})







module.exports = router;
const { Router } = require('express');
const router = Router();

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.
const axios = require('axios');      

const { Diet } = require('../db.js');   // Importo el modelo que necesito haciendo un destructuring.

//  http://localhost:3001/types


// El metodo de abajo solo recolecta 9 de las 10 dietas existentes. Además las dietas obtenidas no coniciden 100% con las que estan en la lista oficial.
// Dietas obtenidas: gluten free, dairy free, lacto ovo vegetarian, vegan, paleolithic, primal, pescatarian, fodmap friendly, whole 30, vegetarian
async function loadDietsInDb() {
    const recipesAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)  // Busco 100 recetas en la API externa...
    let diets = recipesAPI.data.results.map(recipe => {      //... de las cuales solo necesito las dietas.
        return recipe.diets
    })
 
    diets.push('vegetarian')   // Tengo que pushear este tipo de dieta porque no queda incluida en ninguno de las 100 recetas devueltas por la API externa.
    diets = diets.flat()  // Tengo un array cuyos elementos son arrays, por lo que uso .flat() para dejar todas las dietas al mismo nivel en el array.

    // En este punto, las dietas en el array estan repetidas, pero se cargaran una unica vez en la DB por usar .findOrCreate.
    for (let i = 0; i < diets.length; i++) {     
        await Diet.findOrCreate({      
            where: { name: diets[i] }
        })
    }
};
// loadDietsInDb();



router.get('/', async (req, res) => {
    const dietsDb = await Diet.findAll();   // Busco todos los registros de la tabla 'diets' de mi BDD.
    
    dietsDb.length ?
    res.json(dietsDb) :
    res.status(404).json({ error: 'No se encontró ninguna dieta en la Base de Datos' });
})


module.exports = router;




// METODO INCORRECTO
// Función para cargar los tipos de dieta en mi Base de Datos apenas se inicie mi servidor.
// async function loadDietsInDb() {
//     const dietsTypes = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30']
    
//     for (let i = 0; i < dietsTypes.length; i++) {     // Por cada tipo de dieta, agrego un registro en la tabla de 'diets' de mi Base de Datos.        
//         await Diet.findOrCreate({      // Para usar con:   { force: false }
//             where: { name: dietsTypes[i] }
//         })
//     }
// };
// loadDietsInDb();
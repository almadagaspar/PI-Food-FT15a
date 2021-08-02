const { Router } = require('express');
const router = Router();
// const axios = require('axios');      // BORRAR???

require('dotenv').config();    // Importo la configuración de 'dotenv' para poder acceder a las constantes del archivo .env
const { API_KEY } = process.env;   // Almaceno en API_KEY la key para poder acceder a la API al usar axios.
const { Diet } = require('../db.js');   // Importo el modelo que necesito haciendo un destructuring.

// http://localhost:3001/types

// Función para cargar los tipos de dieta en mi Base de Datos apenas se inicie mi servidor.
async function loadDietsInDb() {
    const dietsTypes = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30']

    for (let i = 0; i < dietsTypes.length; i++) {     //// Por cada tipo de dieta, agrego un registro en la tabla de 'diets' de mi Base de Datos.        
        await Diet.findOrCreate({      // Usar con:   { force: false }
            where: { name: dietsTypes[i] }
        })
    }
};    
loadDietsInDb();



router.get('/', async (req, res) => {
    const dietsDb = await Diet.findAll();   // Busco todos los registros de la tabla 'diets' de mi BDD.

    dietsDb.length ? res.json(dietsDb) :
    res.status(404).json({error: 'No se encontró ninguna dieta en la Base de Datos'});
})





module.exports = router;
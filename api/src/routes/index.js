const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const recipesRouter = require('./recipes.js');   // Guardo en variables los archivos a los que voy a redirigir el request segun corresponda.
const recipeRouter = require('./recipe.js')
const typesRouter = require('./types.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);    // Redirijo el request la ruta de recetas.
router.use('/recipe', recipeRouter);    // Redirijo el request la ruta de detalle de receta.
router.use('/types', typesRouter);    // Redirijo el request la ruta de tipos de dietas.


module.exports = router;

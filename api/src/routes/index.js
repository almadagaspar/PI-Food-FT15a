const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const recipesRouter = require('./recipes.js');   // Guardo en variables los archivos a los que voy a redirigir el request segun corresponda.
const recipeRouter = require('./recipe.js')
const dietRouter = require('./diet.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRouter);    // Redirijo el request segun el caso.
router.use('/recipe', recipeRouter);
router.use('/diet', dietRouter);


module.exports = router;

const { Router } = require('express');

const routerRecipes = require ("./router_Recipes");
const routerDiets = require ("./router_Diets");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", routerRecipes)

// router.use("/diets",)


module.exports = router;

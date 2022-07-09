const {Router} = require ("express");

require ("dotenv").config();
const { Recipe, Diet } = require ('../db');
const { getAllRecipes, getRecipesByName, getRecipeById, getDBRecipeById, postErrors } = require ("../controllers/recipes")

const router = Router();

//esta ruta si le pasan un nombre, muestra las recetas con ese nombre, de lo contrario muestra todas las recetas
router.get("/", async (req, res) => {
    const { name } = req.query;

    try {
        let recipes = await getAllRecipes(); //traigo las recetas de la api y de la db 
        if (!name) {
            let infoRecipes = recipes.map((rc) => {  //si no hay un name, muestro todas las recetas
                return {
                    id: rc.id,
                    image: rc.image,
                    name: rc.name,
                    dietTypes: rc.dietTypes,
                    healthScore: rc.healthScore
                }
            });
            return res.status(200).send(infoRecipes);
        };
        let dataByName = await getRecipesByName(recipes, name); //si hay un name, muestro las recetas con ese nombre
        return res.status(200).send(dataByName);

    } catch (error) {
        return res.status(404).send({error: error.message});
    }
});

//esta ruta busca recetas por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if(isNaN(id) === false) {  //si el ID es un numero lo busco en la API
            let recipeById = await getRecipeById(id);
            return res.status(200).send(recipeById);
        }
        let recipeDbById = await getDBRecipeById(id); // si no es un numero lo busco por UUID en la DB
        return res.status(200).send(recipeDbById); 

    } catch (error) {
        return res.send({error: error.message});
    }
});

//ruta de creacion de recetas
router.post("/", async (req, res) => {
    const { name, summary, healthScore, steps, image, dietTypes } = req.body;   
    const aux = JSON.stringify(steps)

    try {
        await postErrors(name, summary);
        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps: aux,
            image: image || "https://cdn-icons-png.flaticon.com/512/2385/2385961.png"
        });
         let dietTypesDb = await Diet.findAll({
             where: {name: dietTypes}
        }); // busca las dietas y las conecta con la receta
        newRecipe.addDiet(dietTypesDb);
        return res.status(201).send(newRecipe);
        
    } catch (error) {
        return res.status(400).send({error: error.message});
    }    
});

module.exports = router;
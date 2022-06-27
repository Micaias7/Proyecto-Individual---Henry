const {Router} = require ("express");
require ("dotenv").config();

const axios = require ("axios");
const { DB_APIKEY } = process.env;
const { Recipe, Diet } = require('../db');
const { Op } = require ("sequelize");

const router = Router();

//trae la info de la API (100 recetas)
const getInfoApi = async () => {    
    const infoApi =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&addRecipeInformation=true&number=2`)
    .then((r) => {
        let recipes = r.data.results.map((rc) => {
            return {
                id: rc.id,
                image: rc.image,
                name: rc.title,
                dietTypes: rc.diets,
                dishTypes: rc.dishTypes,
                healthScore: rc.healthScore,
                summary: rc.summary,
                steps: rc.analyzedInstructions[0]?.steps.map((st) => {
                    return {
                        number: st.number,
                        step: st.step
                    }
                })
            }
        });
        return recipes;
    });
    return infoApi;  
};
//trae la info de la DB
const getInfoDB = async () => {
    const infoDB = await Recipe.findAll({include: Diet});
    let recipesDB = infoDB.map((r) => {
        return {
            id: r.id,
            name: r.name,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.steps,
            image: r.image,
            dietTypes: r.Diets?.map(diet => diet.name)
        };        
    });
    return recipesDB;
};
//unifica la info de la api con la info de la DB
const getAllRecipes = async () => {
    const recipesApi = await getInfoApi();
    const recipesDB = await getInfoDB();
    const allRecipes = [...recipesDB, ...recipesApi];
    return allRecipes;
};

//busca recetas que coincidan por nombre
const getRecipesByName = async (recipes, name) => {
    let recipesNames = recipes.filter((r) => {
        return r.name.toLowerCase().includes(name.toLowerCase())});

    if (recipesNames.length) {
        let dataByName = recipesNames.map((r) => {
            return {
                id: r.id,
                image: r.image,
                name: r.name,
                dietTypes: r.dietTypes,
                healthScore: r.healthScore                   
            }
        });
        return (dataByName);
    } else {
        throw new Error("Sorry, recipe not found. But you can create it if you want");        
    }
};
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


//busca recetas en la API por ID
const getRecipeById = async (id) => {
    try {
        const findRecipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${DB_APIKEY}`)
        .then((r) => r.data);
        let recipe = {
            id: findRecipe.id,
            image: findRecipe.image,
            name: findRecipe.title,
            dietTypes: findRecipe.diets,
            dishTypes: findRecipe.dishTypes,
            healthScore: findRecipe.healthScore,
            summary: findRecipe.summary,
            steps: findRecipe.analyzedInstructions[0]?.steps.map((st) => {
                return {
                    number: st.number,
                    step: st.step
                }
            })                
        }
        return recipe;
        
    } catch (error) {
        throw new Error(`A recipe with the id ${id} does not exist.`)        
    }
};
//busca recetas en la DB por ID
const getDBRecipeById = async (id) => {
        let recipeDB = await Recipe.findByPk(id, {include: Diet});
        if (!recipeDB) {
            throw new Error(`No recipe found with this ID: ${id}.`);            
        }
        let recipe = {
            id: recipeDB.id,
            name: recipeDB.name,
            summary: recipeDB.summary,
            healthScore: recipeDB.healthScore,
            steps: recipeDB.steps,
            image: recipeDB.image,
            dietTypes: recipeDB.Diets?.map(diet => diet.name)            
        }       
        return recipe;    
};

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


//controla los posibles errores en el post
const postErrors = async (name, summary) => {
    if(!name || !summary) {
        throw new Error("you must enter a name and a summary for the recipe.");
    }
    let findRecipeDb = await Recipe.findOne({where: {name: {[Op.iLike]: name}}});
    if(findRecipeDb) {
        throw new Error("A recipe with that name already exists.");
    }    
};
//ruta de creacion de recetas
router.post("/", async (req, res) => {
    const { name, summary, healthScore, steps, image, dietTypes } = req.body;    

    try {
        await postErrors(name, summary);
        let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image
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
//probar ruta en postman

module.exports = router;
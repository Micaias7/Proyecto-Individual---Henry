const {Router} = require ("express");
require ("dotenv").config();

const axios = require ("axios");
const { DB_APIKEY } = process.env;

const router = Router();

//trae la info de la api
const getInfoApi = async () => {
    
    const infoApi =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&addRecipeInformation=true&number=4`)
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
}; // falta hacer la funcion que traiga la info de la db

const getRecipeById = async (id) => {

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
}; // trae la receta por id de la api
//falta la funcion que traiga de la db

router.get("/", async (req, res) => {
    const { name } = req.query;

    try {
        let recipes = await getInfoApi(); //ahora traigo la info de la api
        // tengo que traer la info de la appi y la info de la db combinada..

        if (!name) {
            let infoRecipes = recipes.map((rc) => {
                return {
                    id: rc.id,
                    image: rc.image,
                    name: rc.name,
                    dietTypes: rc.dietTypes,
                    healthScore: rc.healthScore                   
                }
            });
            return res.status(200).send(infoRecipes);
        }
                        
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
            return res.status(200).send(dataByName);
        } else {
            return res.status(404).send({error: "Sorry, recipe not found. But you can create it if you want"})
        }
        
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if(isNaN(id) === false) {
            let recipeById = await getRecipeById(id);
            return res.status(200).send(recipeById);
        }
        return res.send({msg: "es un UUID"}); 

    } catch (error) {
        return res.send({error: error.response.data.message})
    }
})

module.exports = router;
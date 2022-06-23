const {Router} = require ("express");

const axios = require ("axios");
const { DB_APIKEY } = process.env;

const router = Router();


const getInfoApi = async () => {
    
    const infoApi =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=bdbf86c1ad014b01be366f0edf588991&addRecipeInformation=true&number=1`)
    .then((r) => {
        let recipes = r.data.results.map((rc) => {
            return {
                id: rc.id,
                img: rc.image,
                name: rc.title,
                dietTypes: rc.diets,
                dishTypes: rc.dishTypes,
                healthScore: rc.healthScore,
                summary: rc.summary,
                steps: rc.analyzedInstructions[0].steps.map((st) => {
                    return {
                        number: st.number,
                        step: st.step
                    }
                })
            }
        })
        return recipes[0];
    })
    return infoApi;  
}

router.get("/", async (req, res) => {
    const {name} = req.query;

    try {
        const data = await getInfoApi()
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send(error)
    }

})

module.exports = router;
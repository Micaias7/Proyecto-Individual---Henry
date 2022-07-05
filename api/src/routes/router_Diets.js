const {Router} = require ("express");
const { Diet } = require ("../db");

const router = Router();

//trae todas las Dietas de la DB
router.get("/", async (req, res) => {
    try {
        let dietTypes = await Diet.findAll();
        return res.status(200).send(dietTypes);
    } catch (error) {
        return res.status(400).send({error: error.message});      
    }
});

module.exports = router;
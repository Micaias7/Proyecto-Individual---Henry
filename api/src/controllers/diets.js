const { getAllRecipes } = require ("./recipes");
const { Diet } = require ("../db")

const allDietTypes = async () => {
    let dietTypes = [];
    (await getAllRecipes()).map(r => dietTypes = [...new Set([...dietTypes, ...r.dietTypes])]);
    return dietTypes;
};

const loadDietTypes = async () => {
    (await allDietTypes()).map((d) => {
        Diet.findOrCreate({where: {name: d}});
    });
};

module.exports = {
    loadDietTypes
}

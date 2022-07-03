import {
    GET_ALL_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIET_TYPES,
    CREATE_RECIPE,
    SEARCH_RECIPES,
    FILTER_BY_DIET_TYPE,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_HEALTH_SCORE
} from "../actions/types";

const initialState = {
    recipes: [], //las recetas que se van mostrando de acuerdo a los filtros
    allRecipes: [], //siempre tengo todas las recetas para filtrar 
    dietTypes: [],
    recipeDetail: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case GET_DIET_TYPES:
            return {
                ...state,
                dietTypes: action.payload
            };
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            };
        case CREATE_RECIPE:
            return {
                ...state
            };
        case SEARCH_RECIPES:
            const aux = state.allRecipes;
            const recipesNames = aux.filter((r) => {
                return r.name.toLowerCase().includes(action.payload.toLowerCase())});
            if (!recipesNames[0]) return alert ('Recipe Not Found');   
            return {
                ...state,
                recipes: recipesNames
            };
        case FILTER_BY_DIET_TYPE:
            const allRecipes = state.allRecipes;
            const recipesFiltered = action.payload === "All" ? allRecipes :
            allRecipes.filter((r) => r.dietTypes?.some((dt) => dt === action.payload));
            return {
                ...state,
                recipes: recipesFiltered
            };
        case FILTER_BY_ORIGIN:
            const recipes = state.allRecipes;
            const originFilter = action.payload === "All" ? recipes : 
            action.payload === "Api" ? recipes.filter((r) => !isNaN(r.id)) :
            recipes.filter((r) => isNaN(r.id));
            return {
                ...state,
                recipes: originFilter[0] ? originFilter : 
                [{msg: "There are no recipes created yet. You can create one if you want."}]
            };
        case ORDER_BY_NAME:
            const sortRecipes = action.payload === "ABC" ?
            state.recipes.sort(function(a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }) : 
            state.recipes.sort(function(a, b) {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                recipes: sortRecipes
            };
        case ORDER_BY_HEALTH_SCORE:
            const sortByHealthScore = action.payload === "Max" ?
            state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) return -1;
                if (a.healthScore < b.healthScore) return 1;
                return 0;
            }) :
            state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) return 1;
                if (a.healthScore < b.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipes:sortByHealthScore
            };
        default:
            return state;
    };
};


export default reducer;
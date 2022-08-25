import {
    GET_ALL_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIET_TYPES,
    CREATE_RECIPE,
    SEARCH_RECIPES,
    FILTER_BY_DIET_TYPE,
    ORDER_BY_NAME,
    ORDER_BY_HEALTH_SCORE,
    CLEAN_DETAIL
} from "../actions/types";
import Swal from 'sweetalert2';

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
                ...state,
                recipes: [ action.payload, ...state.recipes],
                allRecipes: [ action.payload, ...state.allRecipes]
            };
        case SEARCH_RECIPES:
            const aux = state.allRecipes;
            const recipesNames = aux.filter((r) => {
                return r.name.toLowerCase().includes(action.payload.toLowerCase())});
            if (!recipesNames[0]) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Recipe Not Found',
                });
                return {...state};
            };
            return {
                ...state,
                recipes: recipesNames
            };
        case FILTER_BY_DIET_TYPE:
            const allRecipes = state.allRecipes;
            const recipesFiltered = action.payload === "All" ? allRecipes :
            allRecipes && allRecipes.filter((r) => r.dietTypes?.some((dt) => dt === action.payload));
            return {
                ...state,
                recipes: recipesFiltered
            };
        case ORDER_BY_NAME:
            const sortRecipes = action.payload === "ABC" ?
            state.recipes && state.recipes.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) : 
            state.recipes && state.recipes.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                recipes: sortRecipes
            };
        case ORDER_BY_HEALTH_SCORE:
            const sortByHealthScore = action.payload === "Max" ?
            state.recipes && state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) return -1;
                if (a.healthScore < b.healthScore) return 1;
                return 0;
            }) :
            state.recipes && state.recipes.sort(function(a, b) {
                if (a.healthScore > b.healthScore) return 1;
                if (a.healthScore < b.healthScore) return -1;
                return 0;
            });
            return {
                ...state,
                recipes:sortByHealthScore
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }    
        default:
            return state;
    };
};


export default reducer;
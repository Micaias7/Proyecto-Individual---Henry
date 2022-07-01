import {
    GET_ALL_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS_TYPES,
    CREATE_RECIPE,
    SEARCH_RECIPES
} from "../actions/types"; 

const initialState = {
    recipes: [],
    dietsTypes: [],
    recipeDetail: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
        case GET_DIETS_TYPES:
            return {
                ...state,
                dietsTypes: action.payload
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
            return {

            }       
        default:
            return state;
    };
};


export default reducer;
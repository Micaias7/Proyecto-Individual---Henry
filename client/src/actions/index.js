import axios from "axios";
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
} from "./types";

export const getAllRecipes = () => {
    return function (dispatch) {
        return axios("http://localhost:3001/recipes")
        .then(response => dispatch({
            type: GET_ALL_RECIPES, payload: response.data
        }))
        .catch(error => console.log(error));         
    };
};

export const getRecipeDetail = (id) => {
    return function (dispatch) {
        return axios(`http://localhost:3001/recipes/${id}`)
        .then(response => dispatch({
            type: GET_RECIPE_DETAIL, payload: response.data
        }))
        .catch(error=> error);
    };
};

export const getDietTypes = () => {
    return function (dispatch) {
        return axios("http://localhost:3001/diets")
        .then(response => dispatch({
            type: GET_DIET_TYPES, payload: response.data.map(dt => dt.name)
        }))
        .catch(error => console.log(error));
    };
};

// // export const searchRecipes = (name) => {
// //     return function (dispatch) {
// //         return axios(`http://localhost:3001/recipes?name=${name}`)
// //         .then(response => dispatch({
// //             type: SEARCH_RECIPES, payload: response.data
// //         }))
// //         .catch(error => {
// //             console.log(error);
// //             return alert ("Recipe not found");
// //         });
// //     };
// // };

export const searchRecipes = (payload) => {
    return {
        type: SEARCH_RECIPES,
        payload
    };
};

export const createRecipe = (recipe) => {   
    
    return function (dispatch) {
        return axios.post("http://localhost:3001/recipes", recipe)
        .then(response => dispatch({
            type: CREATE_RECIPE, payload: response.data
        }))
        .catch(error => alert(error.response.data.error));
    };
};

export const filterByDietType = (payload) => {
    return {
        type: FILTER_BY_DIET_TYPE,
        payload
    };
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    };
};

export const orderByHealthScore = (payload) => {
    return {
        type: ORDER_BY_HEALTH_SCORE,
        payload
    };
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL,
        payload: {}
    };
};


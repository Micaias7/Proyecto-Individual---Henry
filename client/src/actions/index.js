import axios from "axios";
import {
    GET_ALL_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS_TYPES,
    CREATE_RECIPE,
    SEARCH_RECIPES
} from "./types";

export const getAllRecipes = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/recipes")
        .then(response => dispatch({
            type: GET_ALL_RECIPES, payload: response.json()
        }))
        .catch(error => console.log(error));
    };
};

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(response => dispatch({
            type: GET_RECIPE_DETAIL, payload: response.json()
        }))
        .catch(error => console.log(error));
    };
};

export const getDietsTypes = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/diets")
        .then(response => dispatch({
            type: GET_DIETS_TYPES, payload: response.json().map(dt => dt.name)
        }))
        .catch(error => console.log(error));
    };
};

export const searchRecipes = (name) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(response => dispatch({
            type: SEARCH_RECIPES, payload: response.json()
        }))
        .catch(error => console.log(error));
    };
};
export const createRecipe = (recipe) => {
    return async function (dispatch) {
        return axios.post("http://localhost:3001/recipes", recipe)
        .then(response => dispatch({
            type: CREATE_RECIPE, payload: response.data
        }))
        .catch(error => console.log(error));
    };
};
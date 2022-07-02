import axios from "axios";
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
} from "./types";

export const getAllRecipes = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/recipes")
        .then(response => response.json())
        .then(response => dispatch({
            type: GET_ALL_RECIPES, payload: response
        }))
        .catch(error => console.log(error));
    };
};

export const getRecipeDetail = (id) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(response => response.json())
        .then(response => dispatch({
            type: GET_RECIPE_DETAIL, payload: response
        }))
        .catch(error => console.log(error));
    };
};

export const getDietTypes = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/diets")
        .then(response => response.json())
        .then(response => dispatch({
            type: GET_DIET_TYPES, payload: response.map(dt => dt.name)
        }))
        .catch(error => console.log(error));
    };
};

export const searchRecipes = (name) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(response => response.json())
        .then(response => dispatch({
            type: SEARCH_RECIPES, payload: response
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

export const filterByDietType = (payload) => {
    return {
        type: FILTER_BY_DIET_TYPE,
        payload
    };
};

export const filterByOrign = (payload) => {
    return {
        type: FILTER_BY_ORIGIN,
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


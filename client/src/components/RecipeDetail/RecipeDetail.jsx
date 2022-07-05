import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../actions";
import { Link } from "react-router-dom";


export default function RecipeDetail(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    },[dispatch]); //eslint-disable-line

    const recipe = useSelector((state) => state.recipeDetail);
    return (
        <div>
            <Link to="/home"><button>Go Back</button></Link>
            {
                recipe?<div>
                    <h1>{recipe.name}</h1>
                    <img src={recipe.image} alt="not found"/>
                    <h3>Health Score: {recipe.healthScore}</h3>
                    <h3>Diet Types:</h3>
                    <div>
                        {recipe.dietTypes?.map((dt, index) => {
                            return (
                                <li key={index}>{dt}</li>
                            )
                        })}
                    </div>
                    <div>
                        <h3>Summary</h3>
                        {recipe.summary?.replace(/<[^>]*>/g, '')}
                    </div>
                    <div>
                        {recipe.steps?.map((st, index) => {
                            return (
                                <li key={index}>Step {index + 1}: {st}</li>
                            )
                        })}
                    </div>

                </div>: <h1>LOADING...</h1>
            }
        </div>
    );
};
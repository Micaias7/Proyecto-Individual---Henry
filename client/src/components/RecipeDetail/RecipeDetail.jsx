import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getRecipeDetail } from "../../actions";
import { Link } from "react-router-dom";
import css from "./RecipeDetail.module.css";
import gif from "../images/gifAguacate.gif";
import loading from "../images/Loading.gif"

export default function RecipeDetail(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getRecipeDetail(id));
        return () => dispatch(cleanDetail()); //limpio el estado de detalle cuando se desmonta el componente
    },[dispatch]); //eslint-disable-line

    const recipe = useSelector((state) => state.recipeDetail);
    return (
        <div className={css.fondo}>
            <div className={css.divBack}>
                <Link to="/home"><button className={css.btnBack}>Go Back</button></Link>
            </div>
            {
                recipe? <div>
                            <div>
                                <h1 className={css.title}>{recipe.name}</h1>
                            </div>
                            <div className={css.container}>                            
                                <div className={css.box}>
                                    <div>
                                        <img className={css.img} src={recipe.image} alt="not found"/>
                                    </div>
                                    <div className={css.contain}>
                                        <div className={css.dietsBox}>
                                            <h3 className={css.dietT}>Diet Types</h3>
                                            <div className={css.typesD}>
                                                {recipe.dietTypes?.map((dt, index) => {
                                                    return (
                                                        <li className={css.dietName} key={index}>{dt}</li>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={css.scoreBox}>
                                            <h3>Health Score: {recipe.healthScore}</h3>
                                            <img className={css.gif} src={gif} alt="gif"/>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.detail}>
                                    <div className={css.summarybox}>
                                        <h1 className={css.sum}>Summary</h1>
                                        {recipe.summary?.replace(/<[^>]*>/g, '')}
                                    </div>
                                    <div className={css.stepsBox}>
                                        {recipe.steps?.map((st, index) => {
                                            return (
                                                <>
                                                 <p className={css.stepN} key={index}>Step {index + 1}</p>
                                                 <p className={css.step} key= {st}>{st}</p>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>: <div className={css.loading}>
                                    <h1>"Loading..."</h1>
                                    <img className={css.imgL} src={loading} alt="LOADING..." />                    
                                </div>
            }
        </div>
    );
};
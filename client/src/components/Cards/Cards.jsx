import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";
import loading from "../images/Loading.gif";

export default function Cards({showRecipes}) {

    return (
        <div className = {style.box}>
            {
                showRecipes && showRecipes[0]?showRecipes.map((r) => {
                    return (                        
                        <Card
                            key = {r.id}
                            id = {r.id}
                            name = {r.name}
                            image = {r.image}
                            healthScore = {r.healthScore}
                            dietTypes = {r.dietTypes}
                        />
                    )                    
                }):
                <div className={style.container}>
                    <h1>"Loading..."</h1>
                    <img className={style.img} src={loading} alt="LOADING..." />                    
                </div>
            }
        </div>
    )
}

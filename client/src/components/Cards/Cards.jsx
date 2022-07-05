import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({showRecipes}) {

    return (
        <div className = {style.box}>
            {
                showRecipes[0]?showRecipes.map((r) => {
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
                }):<h1>"cargando..."</h1>
            }
        </div>
    )
}

import React from "react";
import card from "./Card.module.css";
import { Link } from "react-router-dom";
import img from "../images/msgCrearReceta.jpeg";

export default function Card (props) {
    const { id, name, image, healthScore, dietTypes } = props;

    return (
        <>
            {props.msg ? (
                <div className = {card.container}>
                    <h1>{props.msg}</h1>
                    <img src = {img} alt="There is no recipe." />
                </div>
            ) : (
                <div className = {card.container}>
                    <h2>{name}</h2>
                    <Link to = {`/recipe/detail/${id}`}>
                        <img src = {image} alt = "img not found" />
                    </Link>
                    <h3>Healt Score: {healthScore}</h3>
                    <h3>Diet Types:</h3>
                    <div className = {card.diets}>                 
                        {dietTypes?.map((dt, index) => {
                            return (
                                <li key = {index}>{dt}</li>
                            )
                        })}
                    </div>            
                </div>
            )}    
        </>    
    );
};
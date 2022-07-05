import React from "react";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import nav from "./NavBar.module.css";
import foodApp from "../images/imgFoodApp.png";
import botonBack from "../images/botonBack.png";

export default function NavBar({allDiets, handleFilterDiet, handleOrderByName, handleOrderByHealthScore}) {
    return (
        <div className={nav.background}>            
            <img className={nav.imgF} src={foodApp} alt="not found" />
            <Link to="/">
                <img className={nav.imgClick} src={botonBack} alt="not found" />
            </Link>
            <div className={nav.container}>
                <Filters
                    allDiets = {allDiets}
                    handleFilterDiet = {handleFilterDiet}                   
                    handleOrderByName = {handleOrderByName}
                    handleOrderByHealthScore = {handleOrderByHealthScore}
                />
                <SearchBar/>
                <Link className={nav.link} to = "/recipe/creation">
                <button className={nav.boton}>Create a  new recipe</button>
                </Link>
            </div>
        </div>
    )
}
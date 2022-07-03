import React from "react";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function NavBar({allDiets, handleFilterDiet, handleFilterOrigin, handleOrderByName, handleOrderByHealthScore}) {
    return (
        <div>
            <h4>FILTROS</h4>
            <SearchBar/>
            <Link to = "/recipe/creation">
                <button>Create a  new recipe</button>
            </Link>
            <Filters
                allDiets = {allDiets}
                handleFilterDiet = {handleFilterDiet}
                handleFilterOrigin = {handleFilterOrigin}
                handleOrderByName = {handleOrderByName}
                handleOrderByHealthScore = {handleOrderByHealthScore}
            />
        </div>
    )
}
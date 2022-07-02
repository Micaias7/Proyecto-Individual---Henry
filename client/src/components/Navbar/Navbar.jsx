import React from "react";
import Filters from "../Filters/Filters";

export default function NavBar({allDiets, handleFilterDiet, handleFilterOrigin, handleOrderByName, handleOrderByHealthScore}) {
    return (
        <div>
            <h4>FILTROS</h4>
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
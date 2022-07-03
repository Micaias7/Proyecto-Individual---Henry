import React from "react";

export default function Filters({allDiets, handleFilterDiet, handleFilterOrigin, handleOrderByName, handleOrderByHealthScore}) {
    return (
        <div>
            <select defaultValue="Alphabetical order" onChange = {(e) => handleOrderByName(e)}>
                <option disabled>Alphabetical order</option>
                <option value="ABC">A to Z</option>
                <option value="ZYX">Z to A</option>
            </select>
            <select defaultValue="Health score" onChange = {(e) => handleOrderByHealthScore(e)}>
                <option disabled>Health score</option>
                <option value="Max">Max</option>
                <option value="Min">Min</option>
            </select>
            <select defaultValue="Diet types" onChange = {(e) => handleFilterDiet(e)}>
                <option disabled>Diet types</option>
                <option value="All">All</option>
                {
                    allDiets?.map((dt, index) => { //Crea opciones de acuerdo a la cantidad de tipos de dieta
                        return (
                            <option value= {dt} key= {index}>{dt}</option>
                        )
                    }) 
                }
            </select>
            <select defaultValue="Origin" onChange = {(e) => handleFilterOrigin(e)}>
                <option disabled>Origin</option>
                <option value="All">All</option>
                <option value="Api">Existent</option>
                <option value="Database">Created</option>
            </select>
        </div>
    );
};
import React from "react";
import style from "./Paginated.module.css";

export default function Paginated({recipesXpage, numberOfRecipes, paginado, page}) {
    const pages = []; //Se va cargando con los numeros de paginas

//Crea los numeros de acuerdo a la cantidad de recetas total y la cantidad de recetas que quiero mostrar por pagina
    for (let i= 1; i <= Math.ceil(numberOfRecipes/recipesXpage); i++) { 
        pages.push(i);
    };

    return (
        <ul className={style.pag}>           
            {
                pages?.map((number) => {
                    return (
                        <ol key={number}> 
                            <button className={page === number ? style.btnActive : style.btn} onClick={() => paginado(number)}> 
                            {number}
                            </button> 
                        </ol>
                    )
                })
            } 
            
        </ul>
    ); //Renderizo los numeros.Cada numero tiene la funcion para setear la pagina
};
import React from "react";

export default function Paginated({recipesXpage, numberOfRecipes, paginado}) {
    const pages = []; //Se va cargando con los numeros de paginas

//Crea los numeros de acuerdo a la cantidad de recetas total y la cantidad de recetas que quiero mostrar por pagina
    for (let i= 1; i <= Math.ceil(numberOfRecipes/recipesXpage); i++) { 
        pages.push(i);
    };

    return (
        <div>            
            <ul> 
                {
                    pages?.map((number) => {
                        return (
                            <li key={number}> 
                                <button onClick={() => paginado(number)}> 
                                    {number}
                                </button> 
                            </li>
                        )
                    })
                } 
            </ul>
        </div>
    ); //Renderizo los numeros.Cada numero tiene la funcion para setear la pagina
};
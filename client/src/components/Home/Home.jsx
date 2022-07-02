import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByDietType, filterByOrign, getAllRecipes, getDietTypes, orderByHealthScore, orderByName } from "../../actions";
import Cards from "../Cards/Cards";
import Paginated from "../Paginated/Paginated";
import NavBar from "../Navbar/Navbar";

export default function Home () {
    
    //Coneccion para despachar y usar estados globales
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.dietTypes);
    
    //estado local para que se renderice el ordenamiento
    const[order, setOrder] = useState("");    
    //Estados locales para el paginado
    const[page, setPage] = useState(1); //pagina
    const[recipesXpage] = useState(9); //recetas por pagina
    //obtengo los indices de las recetas que voy a mostrar
    let indexLastRecipe = page * recipesXpage; // 9
    let indexFirstRecipe = indexLastRecipe - recipesXpage; //0
    let showRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);
    //Extraigo solo las recetas que voy a mostrar de acuerdo a los indices

    const paginado = (pageNumber) => { //Funcion que setea el numero de pagina
        setPage(pageNumber);
    };

    useEffect(() => { // Carga las recetas cuando se monta el componente
        dispatch(getAllRecipes());
    },[dispatch]);

    useEffect(() => { // Carga las dietas cuando se monta el componente
        dispatch(getDietTypes());
    },[dispatch]);

    const handleFilterDiet = (e) => { //Filtrado por tipo de dieta
        e.preventDefault();
        dispatch(filterByDietType(e.target.value));
        setPage(1);
    };

    const handleFilterOrigin = (e) => { //Filtrado por el origen de la receta
        e.preventDefault();
        dispatch(filterByOrign(e.target.value));
        setPage(1);
    };

    const handleOrderByName = (e) => { //Ordena alfabeticamente (asc/desc)
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    const handleOrderByHealthScore = (e) => { //Ordena por health score
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setPage(1);
        setOrder(`Order ${e.target.value}`);
    };

    return (
        <div>
            <h1>ESTE ES EL HOME</h1>
            <NavBar
                allDiets = {allDiets}
                handleFilterDiet = {handleFilterDiet}
                handleFilterOrigin = {handleFilterOrigin}
                handleOrderByName = {handleOrderByName}
                handleOrderByHealthScore = {handleOrderByHealthScore}
            />
            <Paginated 
                recipesXpage = {recipesXpage}
                numberOfRecipes = {allRecipes.length} //le paso la cantidad numerica de recetas
                paginado = {paginado}
            />
            <Cards showRecipes = {showRecipes}/>
        </div>
    );
};
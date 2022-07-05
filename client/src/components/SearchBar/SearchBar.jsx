import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../actions";
import SBar from "./SearchBar.module.css";


export default function SearchBar () {
    const dispatch = useDispatch();
    const[name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            dispatch(searchRecipes(name));
            setName('');
        } else {
            return alert ("Please write a name");
        }
    };

    return (
        <div className={SBar.search}>
            <input
            className={SBar.input}
            type = "text"
            value = {name}
            placeholder = "Search recipe..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={SBar.boton} type = "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    );
};
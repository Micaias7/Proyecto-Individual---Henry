import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../actions";
import SBar from "./SearchBar.module.css";
import Swal from 'sweetalert2';


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
            Swal.fire({
                position: 'top',
                title: 'Please write a name',
                showConfirmButton: false,
                timer: 1500
              });
        };
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
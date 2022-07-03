import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipes } from "../../actions";


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
        <div>
            <input
            type = "text"
            value = {name}
            placeholder = "Search recipe..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button type = "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    );
};
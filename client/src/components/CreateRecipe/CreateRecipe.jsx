import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function CreateRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);

    const[input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        dietTypes: [],
        image: "",
        steps: "" //??
    });


    return (
        <div>
            <h1>Create your own recipe</h1>
            <form>
                <div>
                    <label>Hola</label>
                    <input type="text" />
                    <label></label>
                    <input type="text" />
                    <label></label>
                    <input type="text" />
                    <label></label>
                    <input type="text" />
                    <label></label>
                    <input type="text" />
                </div>
                <div></div>
            </form>
        </div>
    );
};

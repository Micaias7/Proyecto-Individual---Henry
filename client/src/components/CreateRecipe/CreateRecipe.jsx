import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getDietTypes } from "../../actions";
import css from "./CreateRecipe.module.css";


export default function CreateRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector((state) => state.dietTypes);
    const recipes = useSelector((state) => state.allRecipes);

    useEffect(() => { // Carga las recetas cuando se monta el componente
        dispatch(getDietTypes());
    },[dispatch]);

    const[errors, setErrors] = useState({}); //Estado local de errores
    function validate(input) { // Funcion para validar los inputs
        let errors = {};
        let recipesName = recipes.map((r) => r.name.toLowerCase());
        if(!input.summary) {
            errors.summary = "Summary is required";
        }
        if(input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = "Enter a number between 0 and 100";
        }
        if(!input.name) {
            errors.name = "Name is required";
        } else if (recipesName.includes(input.name.toLowerCase())) {
            errors.name = "A recipe with that name already exists";
        }
        return errors;
    };

    const[input, setInput] = useState({ //Estado local que se va creando para despues hacer el post
        name: "",
        summary: "",
        healthScore: 0,
        dietTypes: [],
        image: "",
        steps: []
    });

    const[aux, setAux] = useState({
        step1:[],
        step2:[],
        step3:[]
    });
    const handleChangeAux = (e) => { //si es steps el target lo guardo como []
        e.preventDefault();
        setAux({...aux, [e.target.name]: [e.target.value]})
        let stepsAux = [...aux.step1, ...aux.step2, ...aux.step3];
        setInput({...input, steps: [...stepsAux]});        
    };

    const handleChange = (e) => { //Guarda el estado que esta cambiando
        e.preventDefault();            
        setInput({
            ...input,
            [e.target.name] : e.target.value 
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value 
        }))
    };

    const handleSelect = (e) => { // Agrega los tipos de dietas seleccionados
        e.preventDefault();
        if(input.dietTypes.includes(e.target.value)) { // Controla que no se repitan
            setInput({
                ...input
            });
        } else {
            setInput({
                ...input,
                dietTypes: [...input.dietTypes, e.target.value]
            });
        };
    };

    const handleSubmit = (e) => { //Creo la receta y seteo el input al estado original
        e.preventDefault();
        console.log("RESULT",input.steps)        
        dispatch(createRecipe(input));        
        setInput({
            name: "",
            summary: "",
            healthScore: 0,
            dietTypes: [],
            image: "",
            steps: []
        });
        setAux({step1:[], step2:[], step3:[]})
        alert("Successful creation")
    };

    const handleDelete = (e, dt) => { //Borra los tipos de dietas que se agregan
        e.preventDefault()
        setInput({
            ...input,
            dietTypes: input.dietTypes.filter((el) => el !== dt)
        })
    }


    return (
        <div>
            <h1>Create your own recipe</h1>
            <Link to= "/home">
                <button>Back to Home</button>
            </Link>
            <form className={css.form}>
                <div>
                    <div>
                        {
                            errors.name && (<p>{errors.name}</p>)
                        }
                        <label>Name:</label>
                        <input type="text" name="name" value= {input.name} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        {
                            errors.summary && (<p>{errors.summary}</p>)
                        }
                        <label>Summary:</label>
                        <input type="text" name="summary" value= {input.summary} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        {
                            errors.healthScore && (<p>{errors.healthScore}</p>)
                        }
                        <label>Health score:</label>
                        <input type="number" name="healthScore" min={1} max={100} value= {input.healthScore} onChange={(e) => handleChange(e)}/>
                    </div>    
                    <div>
                        <label>Steps:</label>
                        <input type="text" name="step1" placeholder="Step 1" value= {aux.step1} onChange={(e) => handleChangeAux(e)}/>
                        <input type="text" name="step2" placeholder="Step 2" value= {aux.step2} onChange={(e) => handleChangeAux(e)}/>
                        <input type="text" name="step3" placeholder="Step 3" value= {aux.step3} onChange={(e) => handleChangeAux(e)}/>                    
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="text" name="image" value= {input.image} onChange={(e) => handleChange(e)}/>
                    </div>
                </div>
                    <select defaultValue="Diet types" onChange={(e) => handleSelect(e)}>
                        <option disabled>Diet types</option>
                        {dietTypes?.map((dt, index) => {
                            return (
                                <option value= {dt} key= {index}>{dt}</option>
                            )
                        })}
                    </select>                          
                {
                    input.dietTypes.map((dt, index) =>
                        <div key={index}>
                            <button onClick={(e) => handleDelete(e, dt)}>X</button>
                            <div>{dt}</div>
                        </div>
                    )
                }  
                <button 
                disabled={!input.name || errors.name || errors.summary || errors.healthScore ? true : false} 
                onClick={(e) => handleSubmit(e)}>
                    Create recipe
                </button>
            </form>            
        </div>
    );
};

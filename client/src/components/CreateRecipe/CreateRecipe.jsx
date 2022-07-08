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
        if (!input.summary) {
            errors.summary = "Summary is required";
        }
        if (input.healthScore < 1 || input.healthScore > 100) {
            errors.healthScore = "Enter a number between 1 and 100";
        }
        if (/^0/.test(input.healthScore)) {
            errors.healthScore = "The number must not start with 0"
        }
        if (/[^0-9]/.test(input.healthScore)) {
            errors.healthScore = "Enter only numbers.";
        }
        if (!input.dietTypes.length) {
            errors.dietTypes = "The recipe has to have a diet";
        }
        // if (input.steps.length === 0) {
        //     errors.steps = "Steps is required";
        // }
        if(!input.name.trim()) {
            errors.name = "Name is required";
        } else if (input.name.trim().length < 6) {
            errors.name = "The name is short";
        } else if (input.name.length > 50) {
            errors.name = "The name exceeded the character limit."
        } else if (recipesName.includes(input.name.toLowerCase())) {
            errors.name = "A recipe with that name already exists";
        } else if (/\d/.test(input.name)) {
            errors.name = "Name cannot contain numbers";
        } else if (/[^A-Za-z0-9\sáéíóúAÉÍÓÚñÑ,]/.test(input.name)) {
            errors.name = "Name cannot contain symbols";
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
        // console.log("AUX",aux)

        // let stepsAux = [...aux.step1, ...aux.step2, ...aux.step3];
        // console.log("STP-AUX",stepsAux)

        setInput({...input, steps: [...aux.step1, ...aux.step2, ...aux.step3]});
        // console.log("INP-STEPS", input.steps)

        // setErrors(validate({...input, steps: [...stepsAux]}));
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
        }));
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
            setErrors(validate({
                ...input,
                dietTypes: e.target.value 
            }));
        };
    };

    const handleSubmit = (e) => { //Creo la receta y seteo el input al estado original
        e.preventDefault();
        // console.log("F",input.steps)
        if (Object.keys(errors).length === 0 && input.name) {
            dispatch(createRecipe(input));        
            setInput({
                name: "",
                summary: "",
                healthScore: 0,
                dietTypes: [],
                image: "",
                steps: []
            });
            setAux({step1:[], step2:[], step3:[]});
            alert("Successful creation");
        } else {
            alert("Complete the required fields")
        }
    };

    const handleDelete = (e, dt) => { //Borra los tipos de dietas que se agregan
        e.preventDefault();
        setInput({
            ...input,
            dietTypes: input.dietTypes.filter((el) => el !== dt)
        });
        setErrors(validate({
            ...input,
            dietTypes: input.dietTypes.filter((el) => el !== dt)
        }));
    };


    return (
        <div className={css.container}>
            <div>
                <h1 className={css.title}>Create your own recipe</h1>
                <Link to= "/home">
                    <button className={css.btnBack}>Back to Home</button>
                </Link>
            </div>
            <form className={css.form}>
                <div className={css.inputBox}>
                    <div className={css.inputs}>
                        {
                            errors.name && (<p className={css.errors}>{errors.name}</p>)
                        }
                        <label>Name:</label>
                        <input className={css.textArea} type="text" name="name" value= {input.name} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={css.inputs}>
                        {
                            errors.summary && (<p className={css.errors}>{errors.summary}</p>)
                        }
                        <label>Summary:</label>
                        <input className={css.textArea} type="text" name="summary" value= {input.summary} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={css.inputs}>
                        {
                            errors.healthScore && (<p className={css.errors}>{errors.healthScore}</p>)
                        }
                        <label>Health score:</label>
                        <input className={css.textArea} name="healthScore" type="number" min={1} max={100} value= {input.healthScore} onChange={(e) => handleChange(e)}/>
                    </div>    
                    <div className={css.inputs}>
                        {
                            errors.steps && (<p className={css.errors}>{errors.steps}</p>)
                        }
                        <label>Steps:</label>
                        <input className={css.textArea} type="text" name="step1" placeholder="Step 1" value= {aux.step1} onChange={(e) => handleChangeAux(e)}/>
                        <input className={css.textArea} type="text" name="step2" placeholder="Step 2" value= {aux.step2} onChange={(e) => handleChangeAux(e)}/>
                        <input className={css.textArea} type="text" name="step3" placeholder="Step 3" value= {aux.step3} onChange={(e) => handleChangeAux(e)}/>                    
                    </div>
                    <div className={css.inputs}>
                        <label>Image:</label>
                        <input className={css.textArea} type="text" name="image" value= {input.image} onChange={(e) => handleChange(e)}/>
                    </div>
                </div>
                <div className={css.selectBox}>
                    <label>Add Diet</label>
                    <select className={css.select} defaultValue="Diet types" onChange={(e) => handleSelect(e)}>
                        <option disabled>Diet types</option>
                        {dietTypes?.map((dt, index) => {
                            return (
                                <option value= {dt} key= {index}>{dt}</option>
                            )
                        })}
                    </select>
                </div>
                    <div className={css.dietTypes}>
                        {
                            errors.dietTypes&& (<p className={css.errors}>{errors.dietTypes}</p>)
                        }
                        {
                            input.dietTypes.map((dt, index) =>
                                <>
                                   <div key={index}>{dt}</div>
                                   <button className={css.btnX} onClick={(e) => handleDelete(e, dt)}>X</button>
                                </>
                            )
                        }  
                    </div>                         
                <button className={css.btnCreate}
                    disabled={!input.name || errors.name || errors.summary || errors.healthScore ? true : false}                 
                    onClick={(e) => handleSubmit(e)}>
                    Create recipe
                </button>
            </form>
            <br />        
        </div>
    );
};

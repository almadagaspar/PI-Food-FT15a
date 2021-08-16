import React, { useState } from 'react';
import NavBar from './NavBar.js';
import { addRecipe } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import s from "./AddRecipe.module.css"
import Footer from './Footer.js';


export default function AddRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)


    const [input, setInput] = useState({
        name: "",
        score: 1,
        healthScore: 1,
        summary: "",
        instructions: "",
        diets: []
    })


    function handleChange(e) {  // Para manejar los inputs del tipo: text, number y textarea.

        switch (e.target.name) {   // Validacion para los campos 'score' y 'healthScore'
            case 'score':
            case 'healthScore':
                if (e.target.value < 1 || e.target.value > 99 || e.target.value.length > 2) { // Limito los números a ingresar.
                    return;
                }
                break;
            default:
        }
        // console.log(e.target.name + ':' + e.target.value);

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }




    function handleCheckBox(e) {  // Para manejar los checkboxs.
        if (e.target.checked) {   // ¿ El checkbox al que se le hizo click quedó checkeado?
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            })
        }
    }

    function handleSubmit(e) {   // Para controlar el boton de creación de una nueva receta.
        e.preventDefault();

        if (input.name.trim() === '') {
            alert('The field "name" is required!');
            return;
        }

        if (input.summary.trim() === '') {
            alert('The field "summary" is required!');
            return;
        }

        // console.dir(input)
        dispatch(addRecipe(input));
        alert('Recipe created!');
        setInput({
            name: "",
            summary: "",
            score: 1,
            healthScore: 1,
            instructions: "",
            diets: []
        })
    }


    return (
        <div className={s.add_recipe}>
            <NavBar />
            <fieldset>
                <legend>Add Recipe</legend>
                <form onSubmit={e => handleSubmit(e)} className={s.form}>
                    <div className={s.info}>
                        <div>
                            <label>Name:</label>
                            <input type='text' value={input.name} name='name' autoComplete="off" onChange={e => handleChange(e)} /* required */ />
                        </div>
                        <div>
                            <label>Score:</label>
                            <input type='number' value={input.score} name='score' onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            <label>Health score:</label>
                            <input type='number' value={input.healthScore} name='healthScore' onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            <label>Summary:</label>
                            <textarea rows="10" cols="30" value={input.summary} name="summary" onChange={e => handleChange(e)} /* required */ />
                        </div>
                        <div>
                            <label>Instructions:</label>
                            <textarea rows="10" cols="30" value={input.instructions} name="instructions" onChange={e => handleChange(e)} />
                        </div>
                    <button type="submit">CREATE RECIPE!</button>

                    </div>
                    <div className={s.diets}>
                        <span>Diets:</span>
                        {
                            diets && diets.map((diet, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" name={diet.name} value={diet.id} onChange={e => handleCheckBox(e)} />
                                        <label>{diet.name}</label><br />
                                    </div>
                                )
                            })
                        }

                    </div>

                </form>
            </fieldset>
            <Footer />
        </div>
    );
}


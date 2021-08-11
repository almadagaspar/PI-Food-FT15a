import React, { useState, useEffect } from 'react';
import NavBar from './NavBar.js';
import { addRecipe } from '../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';


export default function AddRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)


    const [input, setInput] = useState({
        name: "",
        summary: "",
        score: 1,      // ¿¿ ESTA BIEN QUE SEA NUMERICO O DEBE SER UN STRING COMO EN POSTMAN ??
        healthScore: 1,
        instructions: "",
        diets: []
    })


    function handleChange(e) {  // Para manejar los inputs del tipo: text, number y textarea.

        switch (e.target.name) {   // Vali9dacion para los campos 'score' y 'healthScore'
            case 'score':
            case 'healthScore':
                if (e.target.value < 1 || e.target.value > 99) {
                    return;
                }
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // console.log(e.target.name + ': ', e.target.value);


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
        console.log(input)
        dispatch(addRecipe(input));
        alert('Recipe created!');
        setInput({
            name: "",
            summary: "",
            score: 0,
            healthScore: 0,
            instructions: "",
            diets: []
        })
    }




    return (
        <div>
            <NavBar />
            <h1>Add Recipe</h1>
            <form onSubmit={e => handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' autoComplete="off" onChange={e => handleChange(e)} required />
                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' value={input.score} name='score' onChange={e => handleChange(e)} />
                    <label> Enter a number between 1 and 99.</label>
                </div>
                <div>
                    <label>Health score:</label>
                    <input type='number' value={input.healthScore} name='healthScore' onChange={e => handleChange(e)} />
                    <label> Enter a number between 1 and 99.</label>
                </div>
                <div>
                    <label>Summary:</label>
                    <textarea rows="10" cols="30" value={input.summary} name="summary" onChange={e => handleChange(e)} required />
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea rows="10" cols="30" value={input.instructions} name="instructions" onChange={e => handleChange(e)} />
                </div>
                <fieldset>
                    <legend>Personalia:</legend>
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
                    {/* {console.log('diets: ', input.diets)} */}

                </fieldset>
                <button type="submit">CREATE RECIPE!</button>

            </form>
        </div>
    );
}


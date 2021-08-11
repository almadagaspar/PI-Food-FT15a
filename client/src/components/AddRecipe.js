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
        score: 0,      // ¿¿ ESTA BIEN QUE SEA NUMERICO O DEBE SER UN STRING COMO EN POSTMAN ??
        healthScore: 0,
        instructions: "",
        diets: []
    })


    function handleChange(e) {  // Para manejar los inputs del tipo: text, number y textarea.
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(e.target.name + ': ', e.target.value);
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
                diets:  input.diets.filter(d => d !== e.target.value)  
            })
        }
    }

function handleSubmit(e) {   // Para controlar el boton de creación de una nueva receta.
    e.preventDefault();
    console.log(input)
    dispatch(addRecipe(input));
    alert('Personaje Creado!');
    setInput({
        name: "",
        summary: "",
        score: 0,
        healthScore: 0,
        instructions: "",
        diets: []
    })
}

// AL CREARSE UNA NUEVA RECETA SE LIMPIA EL FORMULARIO EXEPTO LOS CHECKBOXES!!


    return (
        <div>
            <NavBar />
            <h1>Add Recipe</h1>
            <form onSubmit={e => handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
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
                    <textarea rows="10" cols="30" value={input.summary} name="summary" onChange={e => handleChange(e)} />
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
                                <div>
                                    <input type="checkbox" name={diet.name} value={diet.id} onChange={e => handleCheckBox(e)} />   {/* SI no funciona asi, cambiar el value={diet.id} por value={diet.name}*/}
                                    <label>{diet.name}</label><br />
                                </div>
                            )
                        })
                    }
                    {console.log('diets: ', input.diets)}

                </fieldset>
                <button type="submit">CREATE RECIPE!</button>

                {/*  https://www.w3schools.com/html/html_form_input_types.asp */}

            </form>
        </div>
    );
}


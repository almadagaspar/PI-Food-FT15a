import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../actions/index.js';
import { useHistory } from 'react-router-dom';
import { getDiets } from '../actions/index.js'
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import s from "./AddRecipe.module.css"


export default function AddRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    const history = useHistory()

    const [input, setInput] = useState({
        name: "",
        score: 1,
        healthScore: 1,
        summary: "",
        instructions: "",
        diets: []
    })


    // Realizo la carga de los diferentes tipos de dietas.
    useEffect(() => {        
        async function loadDiets() {
            await dispatch(getDiets())     
        };
        loadDiets();
    }, [dispatch]); 





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
        alert('RECIPE CREATED!');
        alert('You will be redirected to the HOME page.');
        history.push('/home')
    }


    return (
        <div className={s.add_recipe}>
            <NavBar />
            <fieldset>
                <legend>Add Recipe</legend>
                <form onSubmit={e => handleSubmit(e)} className={s.form}>
                    <div className={s.info}>
                        <label>Name: *</label>
                        <input type='text' value={input.name} name='name' autoComplete="off" onChange={e => handleChange(e)} /* required */ />

                        <label>Score:</label>
                        <input type='number' value={input.score} name='score' onChange={e => handleChange(e)} />

                        <label>Health score:</label>
                        <input type='number' value={input.healthScore} name='healthScore' onChange={e => handleChange(e)} />

                        <label>Summary: *</label>
                        <textarea value={input.summary} name="summary" onChange={e => handleChange(e)} />

                        <label>Instructions:</label>
                        <textarea value={input.instructions} name="instructions" onChange={e => handleChange(e)} />
                        <button type="submit">CREATE</button>

                    </div>
                    <div className={s.diets}>
                        <label>Diets:</label>
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
            <span className={s.message}>(*) These fields are required.</span>
            <Footer />
        </div>
    );
}


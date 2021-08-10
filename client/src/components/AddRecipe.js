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


    return (
        <div>
            <NavBar />
            <h1>Add Recipe</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' />
                </div>
                <div>
                    <label>Summary:</label>
                    <input type='text' value={input.summary} name='sumary' />
                </div>
                <div>
                    <label>Score:</label>
                    <input type='number' value={input.score} name='score' />
                </div>
                <div>
                    <label>Health score:</label>
                    <input type='number' value={input.healthScore} name='healthScore' />
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea name="instructions" rows="10" cols="30" value={input.instructions} />
                    {/* <input type='text' value={input.instructions} name='instructions' /> */}
                </div>
                <div>
                    <label>Diets:</label>
                    <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
                    <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>

                    {/*  https://www.w3schools.com/html/html_form_input_types.asp */}
                </div>

            </form>
        </div>
                            );
}


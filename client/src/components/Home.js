import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getRecipesByName, changeLoadingState } from '../actions/index.js'   // Importo las Action.

import NavBar from './NavBar.js';  //// Importo los componentes que voy a necesitar en este componente.
import Card from './Card.js';


// BUGS:
// Si envio desde el Bacl un 404 al Front cuando no encuentra resultados en la abusqueda, no llega un array vacio
// para que desaparezca el loading...

export default function Home() {
    const dispatch = useDispatch();  // Creo una instancia de useDispatch para usar posteriormente despachar actions al reducer.

    useEffect(() => {        // Hago una carga inicial de recetas solo la primera vez que se ingresa a esta página. 
        const LoadRecipes = async function () {
            if (loading) {         // Si es la primera vez que entro al Home...
                await dispatch(getRecipes())     // Realizo una carga inicial de videojuegos.
                dispatch(changeLoadingState())     // El estado de 'loading' comienza en true, pero tras la carga inicial de recetas debo cambiarlo a false.
            }
        };
        LoadRecipes();
    }, []);


    const [title, setTitle] = useState("");  // Creo un estado local para almacenar dinamicamente el contenido del input con el nombre de la receta a buscar.

    function handleChange(e) {  // Se ejecutará cada vez que cambia el contenido del imput para así mantener actualizado el estado local con el nombre de la receta a buscar.
        setTitle(e.target.value);
    }

    async function handleSubmit(e) {  // Se ejecutará al presionarse sobre el boton 'Buscar' o Enter.
        e.preventDefault();
        if (!loading) {     // Desactivo el boton buscar mientras se esta haciendo una busqueda.
            dispatch(changeLoadingState());          // Esta por comenzar una busqueda, por lo que cambio es estado de 'loading' a true.
            await dispatch(getRecipesByName(title));   // Envio al reducer la action de busqueda por nombre. Evito con en 'await' que se lea la linea siguiente antes de tiempo.
            dispatch(changeLoadingState());         // Acaba de terminar una busqueda, por lo que cambio es estado de 'loading' a false.
        }
    }

    const loading = useSelector(state => state.loading)  // Accedo al estado global 'loading'.
    const recipes = useSelector(state => state.recipes)  // Accedo al estado global 'recipes'.


    return (
        <div>
            <NavBar />
            <h2>Buscador de Recetas</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <span>
                    <label className="label" htmlFor="title">Receta: </label>
                    <input type="text" placeholder="Ingrese un nombre..." onChange={handleChange} value={title} id="title" autoComplete="off" />
                </span>
                <button type="submit">BUSCAR</button>

            </form>
            {
                loading || recipes.length > 0 ?         // Si se esta haciendo una busqueda, o hay recetas para mostrar...
                    loading ? <h1>Loading...</h1> : recipes.map(r => {       // ...muesto 'loading...' o las recetas cargadas segun corresponda.
                        return (
                            <Card image={r.image} name={r.name} diets={r.diets} />
                        )
                    })

                    : <h2>NO HAY RECETAS CON ESE NOMBRE</h2>       // Si NO hay recetas para mostrar y NO se esta haciendo una busqueda, muestro el mensaje correspondiente.
            }
        </div>
    );
};


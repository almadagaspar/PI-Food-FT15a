import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getRecipesByName, changeLoadingState } from '../actions/index.js'   // Importo las Action.

import NavBar from './NavBar.js';  // Importo los componentes que voy a necesitar en este componente.
import Card from './Card.js';
import Paginado from './Paginado.js';


export default function Home() {
    const dispatch = useDispatch();  // Creo una instancia de useDispatch para usar posteriormente despachar actions al reducer.
    const loading = useSelector(state => state.loading)  // Accedo al estado global 'loading'.
    const recipes = useSelector(state => state.recipes)  // Accedo al estado global 'recipes'.
    const [title, setTitle] = useState("");  // Creo un estado local para almacenar dinamicamente el contenido del input con el nombre de la receta a buscar.


    // PAGINADO:
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);   // ¿ PUEDE SER UNA COSNTANTE EN LUGAR DE UN ESTADO LOCAL?
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() => {        // Hago una carga inicial de recetas solo la primera vez que se ingresa a esta página. 
        const LoadRecipes = async function () {
            if (loading) {         // Si es la primera vez que entro al Home...
                await dispatch(getRecipes())     // Realizo una carga inicial de videojuegos.
                dispatch(changeLoadingState())     // El estado de 'loading' comienza en true, pero tras la carga inicial de recetas debo cambiarlo a false.
            }
        };
        LoadRecipes();
    }, []);


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


    return (
        <div>
            <NavBar />
            <select>
                <option value='asc'>Ascendente</option>
                <option value='des'>Descendente</option>
            </select>

            <h2>Buscador de Recetas</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <span>
                    <label className="label" htmlFor="title">Receta: </label>
                    <input type="text" placeholder="Ingrese un nombre..." onChange={handleChange} value={title} id="title" autoComplete="off" />
                </span>
                <button type="submit">BUSCAR</button>
            </form>

            <Paginado
                recipesPerPage={recipesPerPage}
                recipes={recipes.length}
                paginado={paginado}
            />

            {
                 // Si se esta haciendo una busqueda o hay recetas cargadas, muesto 'loading...' o las recetas cargadas segun corresponda.
                loading || recipes.length > 0 ? 
                    loading ? <h1>Loading...</h1> :
                    currentRecipes.map((r, i) => {      
                        return (
                            <Card key={i} image={r.image} name={r.name} diets={r.diets} />
                        )
                    })

                    : <h2>NO HAY RECETAS CON ESE NOMBRE!!</h2>       // Si NO hay recetas para mostrar y NO se esta haciendo una busqueda, muestro el mensaje correspondiente.
            }
        </div>
    );
};


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, getRecipesByName, changeLoadingState, filterRecipesByDiet } from '../actions/index.js'   // Importo las Action.

import NavBar from './NavBar.js';  // Importo los componentes que voy a necesitar en este componente.
import Card from './Card.js';
import Diet from './Diet.js';
import Paginado from './Paginado.js';

// BUGS:
// Al hacer una busqueda desde una pagina del paginado con nuemro superior al numero de paginas que se generarán
// con el resultado de esta ultima ruta, no se vusualizan las recetas conseguidas, por lo que hay que hacer click en
// la pagina 1 del paginado para que se visulicen. Posible solución: tras una busqueda, forzar a ir a la primera pagina del paginado.

// Al usar un filtro que no devuelve ninguna receta, muestra THERE ARE NO RECIPES WITH THAT NAME !

// Al hacer una nueva busqueda por nombre se debería resetear el filtrado por dietas en All.

export default function Home() {
    const dispatch = useDispatch();  // Creo una instancia de useDispatch para usar posteriormente despachar actions al reducer.
    const loading = useSelector(state => state.loading)  // Accedo al estado global 'loading'.
    const recipes = useSelector(state => state.recipes)  // Accedo al estado global 'recipes'.
    const recipesBkp = useSelector(state => state.recipesBkp)  // Accedo al estado global 'recipesBkp'.
    const diets = useSelector(state => state.diets)  // Accedo al estado global 'diets'.
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
                await dispatch(getRecipes())     // Realizo una carga inicial de videojuegos. Los 'await' son para que no se cambie el stado de 'loading' antes de tienpo.
                await dispatch(getDiets())     // Realizo la carga de los diferentes tipos de dietas.
                dispatch(changeLoadingState())     // 'loading' comienza en true, pero tras la carga inicial de recetas debo cambiarlo a false.
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

    function handleFilterRecipesByDiet(e) {
        dispatch(filterRecipesByDiet(e.target.value));
    }



    return (
        <div>
            <NavBar />
            <select>
                <option value='asc'>Ascending</option>
                <option value='des'>Descending</option>
            </select>


            <select onChange={e => handleFilterRecipesByDiet(e)}>
                <option value='All'>All</option>
                {
                    diets && diets.map((diet, i) => {
                        return (
                            <Diet diet={diet.name} key={i} />
                        )
                    })
                }
            </select>


            <h2>Search by Recipe</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <span>
                    <label className="label" htmlFor="title">Recipe: </label>
                    <input type="text" placeholder="Write the name here!" onChange={handleChange} value={title} id="title" autoComplete="off" />
                </span>
                <button type="submit">SEARCH</button>
            </form>

            <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} paginado={paginado} />

            {
                // Si se esta haciendo una busqueda o hay recetas cargadas, muesto 'loading...' o las recetas cargadas segun corresponda.
                loading || recipes.length ?

                    loading ? <h1>Loading...</h1> :
                        currentRecipes.map((r, i) => {
                            return (
                                <Card key={i} image={r.image} name={r.name} diets={r.diets} />
                            )
                        })
                    // Si NO hay recetas para mostrar y NO se esta haciendo una busqueda, muestro el mensaje correspondiente
                    // segun si la razón por la cual no hay recetas es por una busqueda por nombre sin resultados, o por elegir un filtro sin resultados.  .
                    : recipesBkp.length && !recipes.length ? <h2>THERE ARE NO RECIPES TO SHOW WITH THAT FILTER !</h2> 
                                                           : <h2>THERE ARE NO RECIPES WITH THAT NAME !</h2> 

            }
        </div>
    );
};


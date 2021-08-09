import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getDiets, getRecipesByName, changeLoadingState, filterRecipesByDiet, orderByName, changeOrderByName } from '../actions/index.js'   // Importo las Action.

import NavBar from './NavBar.js';  // Importo los componentes que voy a necesitar en este componente.
import Card from './Card.js';
import Diet from './Diet.js';
import Paginado from './Paginado.js';

// BUGS:
// Al hacer una nueva busqueda por nombre se debería resetear el filtrado por dietas en All, ya que queda el selector de dietas
// en la ultima dieta elegida, pero los resultados obtenidos de por la ultima busqueda por nombre no esta filtrada.

// Si tras filtrar po una dieta, se sale de Home y se vuelve a entrar el selector de dietas vuelve a All pero las recetas siguen filtradas.

// Si tras ordenar por nombre, se sale de Home y se vuelve a entrar el selector ordenar por nombre vuelve a su valor por defecto pero las recetas matiene el ultimo orden elegido.

// Si se aplica un filtro por dieta y despues un ordenamiento alfabeticamente, al quitar el filtro y aparecer las recetas que estaban ocultas, estas no estan ordenadas alfabeticamente.

// Ver si se puede remplazar el estado global 'order' por uno local.

export default function Home() {
    const dispatch = useDispatch();  // Creo una instancia de useDispatch para usar posteriormente despachar actions al reducer.
    const loading = useSelector(state => state.loading)  // Accedo al estado global 'loading'.
    const recipes = useSelector(state => state.recipes)  // Accedo al estado global 'recipes'.
    const recipesBkp = useSelector(state => state.recipesBkp)  // Accedo al estado global 'recipesBkp'.
    const diets = useSelector(state => state.diets)  // Accedo al estado global 'diets'.
    const [recipeName, setRecipeName] = useState("");  // Creo un estado local para almacenar dinamicamente el contenido del input con el nombre de la receta a buscar.
    

    // ORDENAMIENTO
    const order = useSelector(state => state.order)   // importo este estado solo para que se rendericen los cambios de ordenamiento.
    

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
        setRecipeName(e.target.value);
    }



    async function handleSubmit(e) {  // Se ejecutará al presionarse sobre el boton 'Buscar' (o Enter) del input de Buscar por nombre.
        e.preventDefault();
        if (!loading) {     // Desactivo el boton buscar mientras se esta haciendo una busqueda.
            dispatch(changeLoadingState());          // Esta por comenzar una busqueda, por lo que cambio es estado de 'loading' a true.
            await dispatch(getRecipesByName(recipeName));   // Envio al reducer la action de busqueda por nombre. Evito con en 'await' que se lea la linea siguiente antes de tiempo.
            dispatch(changeLoadingState());         // Acaba de terminar una busqueda, por lo que cambio es estado de 'loading' a false.
        }
    }


    function handleOrderByScore(e) {
    }



    function handleOrderByName(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        let sortedRecipes = recipesBkp

        if (e.target.value === 'asc') {
            sortedRecipes = recipes.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            })
        } else {
            sortedRecipes = recipes.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            })
        }
        dispatch(changeOrderByName(sortedRecipes))
    }

   


    function handleFilterRecipesByDiet(e) {
        dispatch(filterRecipesByDiet(e.target.value));
        setCurrentPage(1);
    }


    
    return (
        <div>
            <NavBar />

            <select onChange={e => handleOrderByName(e)} defaultValue={"DEFAULT"} >  {/* Ordenamiento por nombre */}
                <option value="DEFAULT" disabled>Select an order by name</option>
                <option value='asc'>Ascending  A ➜ Z</option>      
                <option value='des'>Descending  Z ➜ A</option>     
            </select >


            <select onChange={e => handleOrderByScore(e)} defaultValue={"DEFAULT"} >  {/* Ordenamiento por nombre */}
                <option value="DEFAULT" disabled>Select an order by score</option>
                <option value='asc'>Ascending 1 ➜ 9</option>  
                <option value='des'>Descending 9 ➜ 1</option> 
            </select >


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
            <form onSubmit={handleSubmit}>
                <span>
                    <input type="text" placeholder="Write the name here!" onChange={handleChange} value={recipeName} autoComplete="off" />
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
                                <Card key={i} image={r.image} name={r.name} score={r.score} diets={r.diets} />
                            )
                        })
                    // Si NO hay recetas para mostrar y NO se esta haciendo una busqueda, muestro el mensaje correspondiente
                    // segun si la razón por la cual no hay recetas es por una busqueda por nombre sin resultados, o por elegir un filtro sin resultados.  .
                    : recipesBkp.length && !recipes.length ? <h2>THERE ARE NO RECIPES TO SHOW WITH THAT FILTER !</h2>
                        : <h2>THERE ARE NO RECIPES WITH THAT NAME !</h2>

            }
        </div >
    );
};


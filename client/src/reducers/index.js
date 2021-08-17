
import {
  GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS,
  FILTER_RECIPES_BY_DIET, ADD_RECIPE, GET_DETAILS, CHANGE_ORDER, CHANGE_ORDER_BKP
} from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  recipes: [],   // Todas las recetas cargadas para mostrar. Será modificado al aplicar filtros.
  recipesBkp: [],   // Es una copia del estado 'recipes', y lo uso para hacer los filtrados a travez de él pero sin modificarlo. 
  diets: [{ name: 'lacto ovo vegetarian' }],    // Las diferentes dietas a las que puede pertenecer una receta. Le doy un valor inicial para que el select tenga desde el principio su ancho final. 
  details: {},     // Contiene todos los detalles de la última receta seleccionada.
};



// REDUCER
export default function reducer(state = initialState, action) {

  switch (action.type) {

    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesBkp: [...action.payload]   // Creo una copia de todas las recetas obtenidas para usarlo como BackUp en el filtrado.
      }

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      }

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
        recipesBkp: [...action.payload]   // Creo una copia de todas las recetas obtenidas para usarlo como BackUp en el filtrado.
      }

    case CHANGE_LOADING_STATE:
      return {
        ...state,
        loading: action.payload
      }


    case FILTER_RECIPES_BY_DIET:   // Determino las recetas que se deben renderizar segun el filtro elegido. Siempre uso 'recipesBkp' que es el array donde...
      const recipesFiltered = action.payload === 'All' ? [...state.recipesBkp]   // ...estan todas las recetas obtenidas en la última busqueda. 
        : [...state.recipesBkp.filter(r => r.diets.includes(action.payload))]
      return {
        ...state,
        recipes: recipesFiltered,
      }


    case CHANGE_ORDER:  // Actualizo el estado 'recipes' con el último orden elegido. Este es el estado que se renderiza.
      return {
        ...state,
        recipes: action.payload,
      }

    case CHANGE_ORDER_BKP:  // Actualizo el estado 'recipesBkp' con el mismo orden elegido para 'recipes'. Ambos estados deben ser iguales en ordenamiento...
      return {              // ...para que los resultados al irse eligiendo distintos filtros, siempre esten ordenados.
        ...state,
        recipesBkp: action.payload,
      }


    case ADD_RECIPE:
      return {
        ...state
      }

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload
      }

    default:
      return state;
  }

}



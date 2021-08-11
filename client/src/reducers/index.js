
import {
  GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS,
  FILTER_RECIPES_BY_DIET, ADD_RECIPE, UPDATE_ORDER, CHANGE_ORDER, GET_DETAILS
} from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  order: 'none',   // String que contiene el filtro elegido. Al cambiar este estado re actualizan las recetas filtradas en Home.
  recipes: [],   // Todas las recetas cargadas para mostrar. Será modificado al aplicar filtros.
  recipesBkp: [],   // Es una copia del estado 'recipes', y lo uso para hacer los filtrados a travez de el pero sin modificarlo. 
  diets: [],    // Lista de las diferentes dietas a las que puede pertenecer una receta.
  details: {},
};


// REDUCER
export default function reducer(state = initialState, action) {

  switch (action.type) {

    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesBkp: action.payload,
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
        recipesBkp: action.payload
      }

    case CHANGE_LOADING_STATE:
      return {
        ...state,
        loading: !state.loading
      }

    case FILTER_RECIPES_BY_DIET:   // Determino las recetas que se deben renderizar segun el filtro elegido.
      const recipesFiltered = action.payload === 'All' ? state.recipesBkp
        : state.recipesBkp.filter(r => r.diets.includes(action.payload))
      return {
        ...state,
        recipes: recipesFiltered,
        selectedFilter: action.payload
      }

    case UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,   // PROBAR PONER ESTA LINEA AL FINAL DE CHANGE_ORDER PARA PRECINDIE DE ESTE CASE
      }

    case CHANGE_ORDER:
      return {
        ...state,
        recipes: action.payload,
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




import {
  GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS, FILTER_RECIPES_BY_DIET,
  // ORDER_BY_NAME, CHANGE_ORDER_BY_NAME,
  // ORDER_BY_SCORE, CHANGE_ORDER_BY_SCORE
  ORDER, CHANGE_ORDER
} from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  // nameOrder: 'none',
  // scoreOrder: 'none',
  order: 'none',
  recipes: [],   // Todas las recetas cargadas para mostrar. Será modificado al aplicar filtros.
  recipesBkp: [],   // Es una copia del estado 'recipes', y lo uso para hacer los filtrados a travez de el pero sin modificarlo. 
  diets: [],    // Lista de las diferentes dietas a las que puede pertenecer una receta.
};

// REDUCER
function reducer(state = initialState, action) {   // REEMPLAZAR LOS IF POR UN SWITCH

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

    case FILTER_RECIPES_BY_DIET:
      const recipesFiltered = action.payload === 'All' ? state.recipesBkp  // Determino segun el filtro elegido las recetas que se deben renderizar.
        : state.recipesBkp.filter(r => r.diets.includes(action.payload))
      return {
        ...state,
        recipes: recipesFiltered,
        selectedFilter: action.payload
      }



    // case ORDER_BY_NAME:  // Cambio es esatdo 'nameOrder'
    //   return {
    //     ...state,
    //     nameOrder: action.payload,
    //   }

    // case CHANGE_ORDER_BY_NAME:
    //   return {
    //     ...state,
    //     recipes: action.payload,
    //   }

    // case ORDER_BY_SCORE:  // Cambio es esatdo 'nameOrder'
    //   return {
    //     ...state,
    //     scoreOrder: action.payload,
    //   }

    // case CHANGE_ORDER_BY_SCORE:
    //   return {
    //     ...state,
    //     recipes: action.payload,
    //   }

    case ORDER:  // Cambio es esatdo 'nameOrder'
    return {
      ...state,
      order: action.payload,   // PROBAR PONER ESTA LINEA AL FINAL DE CHANGE_ORDER
    }

  case CHANGE_ORDER:
    return {
      ...state,
      recipes: action.payload,
    }

    default:
      return state;
  }

}




export default reducer;
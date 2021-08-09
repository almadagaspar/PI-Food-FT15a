
import { GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS, FILTER_RECIPES_BY_DIET, ORDER_BY_NAME, CHANGE_ORDER } from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  order: 'none',
  recipes: [],   // Todas las recetas cargadas para mostrar. Será modificado al aplicar filtros.
  recipesBkp: [],   // Es una copia del estado 'recipes', y lo uso para hacer los filtrados a travez de el pero sin modificarlo. 
  diets: [],    // Lista de las diferentes dietas a las que puede pertenecer una receta.
  // originalOrder: []
};

// REDUCER
function reducer(state = initialState, action) {   // REEMPLAZAR LOS IF POR UN SWITCH

  if (action.type === GET_RECIPES) {
    return {
      ...state,
      recipes: action.payload,
      recipesBkp: action.payload,
      // originalOrder: action.payload,
    }
  }

  if (action.type === GET_DIETS) {
    return {
      ...state,
      diets: action.payload
    }
  }

  if (action.type === GET_RECIPES_BY_NAME) {
    return {
      ...state,
      recipes: action.payload,
      recipesBkp: action.payload
    }
  }

  if (action.type === CHANGE_LOADING_STATE) {
    return {
      ...state,
      loading: !state.loading
    }
  }

  if (action.type === FILTER_RECIPES_BY_DIET) {
    // Determino segun el filtro elegido las recetas que se deben renderizar.
    const recipesFiltered = action.payload === 'All' ? state.recipesBkp
      : state.recipesBkp.filter(r => r.diets.includes(action.payload))
    return {
      ...state,
      recipes: recipesFiltered
    }
  }




  if (action.type === ORDER_BY_NAME) {
    return {
      ...state,
      order: action.payload,
      // recipes: sortedRecipes,
    }
  }


  
  if (action.type === CHANGE_ORDER) {
    return {
      ...state,
      recipes: action.payload,
      // recipesBkp: state.recipesBkp
    }
  }
  


  return state;
}




export default reducer;
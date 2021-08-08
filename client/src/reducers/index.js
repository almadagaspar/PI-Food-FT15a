
import { GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS, FILTER_BY_DIET } from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  diets: [],    // Lista de las diferentes dietas a las que puede pertenecer una receta.
  recipes: []   // Todas las recetas cargadas para mostrar.
};

// REDUCER
function reducer(state = initialState, action) {   // REEMPLAZAR LOS IF POR UN SWITCH

  if (action.type === GET_RECIPES) {
    return {
      ...state,
      recipes: action.payload
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
      recipes: action.payload 
    }
  }

  if (action.type === CHANGE_LOADING_STATE) {
    return {
      ...state,
      loading: !state.loading
    }
  }

  if (action.type === FILTER_BY_DIET) {
    const recipes = state.recipes
    const recipesFiltered = action.payload === 'All' ? recipes : recipes.filter( r => r.diets.includes(action.payload))
    return {
      ...state,
      recipes: recipesFiltered
    }
  }



  return state;
}


export default reducer;
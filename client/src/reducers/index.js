
import { GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE, GET_DIETS, FILTER_RECIPES_BY_DIET } from "../actions";


const initialState = {
  loading: true,   // El valor de este estado indica si actualmente se estan cargando recetas
  diets: [],    // Lista de las diferentes dietas a las que puede pertenecer una receta.
  recipes: [],   // Todas las recetas cargadas para mostrar. Será modificado al aplicar filtros.
  recipesBkp: []   // Es una copia del estado 'recipes', y lo uso para hacer los filtrados a travez de el pero sin modificarlo. 
};

// REDUCER
function reducer(state = initialState, action) {   // REEMPLAZAR LOS IF POR UN SWITCH

  if (action.type === GET_RECIPES) {
    return {
      ...state,
      recipes: action.payload,
      recipesBkp: action.payload
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
    // BORRAR ESTO SI EL FILTRO DE MAS ABAJO SIGUE FUNCIONANDO BIEN.
    // const recipesBkp = state.recipesBkp
    // const recipesFiltered = action.payload === 'All' ? recipesBkp : recipesBkp.filter(r => r.diets.includes(action.payload))


    // Determino segun el filtro elegido las recetas que se deben renderizar.
    const recipesFiltered = action.payload === 'All' ? state.recipesBkp    
                                                     : state.recipesBkp.filter(r => r.diets.includes(action.payload))
    return {
      ...state,
      recipes: recipesFiltered
    }
  }



  return state;
}


export default reducer;
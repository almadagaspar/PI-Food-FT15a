
import { GET_RECIPES, GET_RECIPES_BY_NAME, CHANGE_LOADING_STATE } from "../actions";


const initialState = {
  loading: true,   // ¿Se estan cargando recetas?
  recipes: []   // Recetas cargadas para mostrar.
};

// REDUCER

function reducer(state = initialState, action) {

  if (action.type === GET_RECIPES) {
    return {
      ...state,
      recipes: action.payload
    }
  }

  if (action.type === GET_RECIPES_BY_NAME) {
    console.log('*******action:', action)

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



  return state;
}

export default reducer;
import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const CHANGE_LOADING_STATE = 'CHANGE_LOADING_STATE';
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET';
export const ORDER = "ORDER"
export const CHANGE_ORDER = "CHANGE_ORDER"
export const ADD_RECIPE = "ADD_RECIPE"


//// ACTIONS CREATORS

// Buscar las recetas de mi DB, junto con las 100 primeras recetas de la API externa.
export function getRecipes() {
  return function (dispatch) {
    return axios.get('http://localhost:3001/recipes')
      .then(obj => {
        dispatch({
          type: "GET_RECIPES",
          payload: obj.data
        });
      });
  };
}


export function getDiets() {
  return function (dispatch) {
    return axios.get('http://localhost:3001/types')
      .then(obj => {
        dispatch({
          type: "GET_DIETS",
          payload: obj.data
        });
      });
  };
};


export function getRecipesByName(name) {  // Buscar recetas por nombre.
  return async function (dispatch) {
    try {
      const resp = await axios.get('http://localhost:3001/recipes?name=' + name)
      dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: resp.data
      })
    } catch (error) {
      dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: []
      })
    }
  }
}


export function addRecipe(payload) {
  return async function () {
    const resp = await axios.post('http://localhost:3001/recipe', payload);
    return resp;
  }
}



export function changeLoadingState() {   // Invertir el valor del estado 'loading'.
  return {
    type: "CHANGE_LOADING_STATE",
  };
}


export function filterRecipesByDiet(payload) {
  return {
    type: "FILTER_RECIPES_BY_DIET",
    payload
  }
}


export function updateOrder(payload) {
  return {
    type: "ORDER",
    payload
  }
}

export function changeOrder(payload) {
  return {
    type: "CHANGE_ORDER",
    payload
  }
}



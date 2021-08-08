import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const ADD_RECIPE = 'ADD_RECIPE';
export const CHANGE_LOADING_STATE = 'CHANGE_LOADING_STATE';
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET';


//// ACTIONS CREATORS

export function getRecipes() {   // Buscar las recetas de mi DB, junto con las 100 primeras recetas de la API externa.
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

// Buscar recetas por nombre.
export function getRecipesByName(name) {
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


// BORRAR SI LA VERSION DE ARRIBA DE ESTA ACTION CREATION SIGUE FUNCIONANDO BIEN.
// export const getRecipesByName = (name) => async (dispatch) => {    // Buscar recetas por nombre.
//   try {
//     const resp = await axios.get('http://localhost:3001/recipes?name=' + name)
//     dispatch({
//       type: "GET_RECIPES_BY_NAME",
//       payload: resp.data
//     })
//   } catch (error) {
//     dispatch({
//       type: "GET_RECIPES_BY_NAME",
//       payload: []
//     })
//   }
// }



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

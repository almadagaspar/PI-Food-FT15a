import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
// export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
// export const ADD_RECIPE = 'ADD_RECIPE';
export const CHANGE_LOADING_STATE = 'CHANGE_LOADING_STATE';
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET';

// export const ORDER_BY_NAME = "ORDER_BY_NAME"
// export const CHANGE_ORDER_BY_NAME = "CHANGE_ORDER_BY_NAME"

// export const ORDER_BY_SCORE = "ORDER_BY_SCORE"
// export const CHANGE_ORDER_BY_SCORE = "CHANGE_ORDER_BY_SCORE"

export const ORDER = "ORDER"
export const CHANGE_ORDER = "CHANGE_ORDER"



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




// export function orderByName(payload) {
//   return {
//     type: "ORDER_BY_NAME",
//     payload
//   }
// }

// export function changeOrderByName(payload) {
//   return {
//     type: "CHANGE_ORDER_BY_NAME",
//     payload
//   }
// }




// export function orderByScore(payload) {
//   return {
//     type: "ORDER_BY_SCORE",
//     payload
//   }
// }

// export function changeOrderByScore(payload) {
//   return {
//     type: "CHANGE_ORDER_BY_SCORE",
//     payload
//   }
// }



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
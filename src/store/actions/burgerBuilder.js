import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const initIngredients = () => {
// we can return another function here for which we receive dispatch function as an argument. dispatch can then be used within the function body due to react-thunk.
  return dispatch => {
    setTimeout ( () => {
      axios.get('https://burger-builder-baefa.firebaseio.com/ingredients.json')
           .then(response => {
              dispatch(setIngredients(response.data));
            })
            .catch(error => {
              dispatch(initIngredientsError());
            });
    });
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
};

export const initIngredientsError = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_ERROR
  }
};

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

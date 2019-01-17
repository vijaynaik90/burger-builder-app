import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  loading:false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon:1.3
};

const reducer = (state = initialState,action) => {

  switch(action.type){

    case actionTypes.ADD_INGREDIENT:
    // dynamically override a property within a JS object using the above syntax.
    // Eg: Here if ingredientName=salad, it will override only salad property of ingredients object and increase the count.
        const addUpdatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
        const addUpdatedIngredients = updateObject(state.ingredients, addUpdatedIngredient);
        return updateObject(state, {
            ingredients: addUpdatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
          });
    case actionTypes.REMOVE_INGREDIENT:
        const removeUpdatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
        const removeUpdatedIngredients = updateObject(state.ingredients, removeUpdatedIngredient);
        return updateObject(state, {
            ingredients: removeUpdatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            building: true
          });
    case actionTypes.SET_INGREDIENTS:
        return updateObject(state, {
            ingredients: action.ingredients,
            error: false,
            totalPrice: 5,
            building: false
          });
    case actionTypes.INIT_INGREDIENTS_ERROR:
        return updateObject(state, {
            ingredients: action.ingredients,
            error: true
          });
    default:
        return state;
  }
};


export default reducer;

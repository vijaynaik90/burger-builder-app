import * as actionTypes from './actions';

const initialState = {
  ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
  },
  totalPrice: 5,
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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName] : state.ingredients[action.ingredientName] + 1
          // dynamically override a property within a JS object using the above syntax.
          // Eg: Here if ingredientName=salad, it will override only salad property of ingredients object and increase the count.
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName] : state.ingredients[action.ingredientName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};


export default reducer;

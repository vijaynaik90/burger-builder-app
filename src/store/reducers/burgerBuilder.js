import * as actionTypes from '../actions/actionTypes';


const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  loading:false
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
    case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: action.ingredients,
          error: false,
          totalPrice: 5
        }
    case actionTypes.INIT_INGREDIENTS_ERROR:
        return {
          ...state,
          error: true
        }
    default:
        return state;
  }
};


export default reducer;

import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false
};
const reducer = (state = initialState,action) => {
  // TODO: Add delete an order action as well so that users can delete orders.
    switch (action.type) {
      case actionTypes.ORDER_BURGER_SUCCESS:
          return {
            ...state,
            loading: false,
            isOrdered: true,
            orders: state.orders.concat({
              ...action.orderData,
              id: action.orderId
            })
          };
      case actionTypes.ORDER_BURGER_FAILURE:
          return {
              ...state,
              loading: false
          };
      case actionTypes.ATTEMPT_ORDER_BURGER:
          return {
              ...state,
              loading: true
          };
      case actionTypes.ORDER_INIT:
          return {
              ...state,
              isOrdered: false
          };
      case actionTypes.FETCH_ORDERS_START:
          return {
            ...state,
            loading: true
          };
      case actionTypes.FETCH_ORDERS_SUCCESS:
          return {
            ...state,
            orders: action.orders,
            loading: false
          };
      case actionTypes.FETCH_ORDERS_FAILURE:
          return {
            ...state,
            loading: false
          };
      default:
          return state;
    }
};


export default reducer;

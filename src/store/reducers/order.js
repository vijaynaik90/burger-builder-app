import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  isOrdered: false
};
const reducer = (state = initialState,action) => {
  // TODO: 
  // 1) Add delete an order action as well so that users can delete orders.
  // 2) Make each order viewable so that user can see ingredients plus other details such as address etc.
    switch (action.type) {
      case actionTypes.ORDER_BURGER_SUCCESS:
          const updatedOrderData = updateObject (action.orderData, {id: action.orderId});
          return updateObject (state, {
            loading: false,
            isOrdered: true,
            orders: state.orders.concat(updatedOrderData)
          });
      case actionTypes.ORDER_BURGER_FAILURE:
          return updateObject (state, {loading: false});
      case actionTypes.ATTEMPT_ORDER_BURGER:
          return updateObject (state, {loading: true});
      case actionTypes.ORDER_INIT:
          return updateObject (state, {isOrdered: false});
      case actionTypes.FETCH_ORDERS_START:
          return updateObject (state, {loading: true});
      case actionTypes.FETCH_ORDERS_SUCCESS:
          return updateObject (state, {
            loading: false,
            orders: action.orders
          });
      case actionTypes.FETCH_ORDERS_FAILURE:
          return updateObject (state, {loading: false});
      default:
          return state;
    }
};


export default reducer;

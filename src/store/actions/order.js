import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderBurgerSuccess = (id,orderData) => {
    return {
      type: actionTypes.ORDER_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData
    };
};

export const orderBurgerFailure = (error) => {
    return {
      type: actionTypes.ORDER_BURGER_FAILURE,
      error: error
    };
};

export const attemptOrderBurger = () => {
    return {
      type: actionTypes.ATTEMPT_ORDER_BURGER
    }
};

export const orderBurger = (orderData,token) => {
    return dispatch => {
      dispatch(attemptOrderBurger());//action returned by attemptOrderBurger is dispatched to the store
      setTimeout( () => {

        axios.post('/orders.json?auth=' + token,orderData)
              .then(response => {
                dispatch(orderBurgerSuccess(response.data.name, orderData));
                // history is accessible here since its poassed from Checkout component
              })
              .catch(error => {
                dispatch(orderBurgerFailure(error));
              });
          },500);
    }
};

export const orderInit = () => {
    return {
      type: actionTypes.ORDER_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFailure = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
      type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token,userId) => {
    return dispatch => {
      dispatch(fetchOrdersStart());
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
      axios.get('/orders.json'+ queryParams)
          .then(res => {
            // transforming data here since we are getting this back from server. Thuis needs to be modified before sending it over to the reducer as action.orders.
            const retrievedOrders = [];
            for (let key in res.data) {
              retrievedOrders.push({
                ...res.data[key],
                id : key
              });
            }
            dispatch(fetchOrderSuccess(retrievedOrders));
          })
          .catch(err => {
            dispatch(fetchOrderFailure(err));
          })
    };
}

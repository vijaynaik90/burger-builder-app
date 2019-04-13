import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { getHeaders,modifyOrderData } from '../../shared/utility';
// ****** Order Burger actions ********
export const orderBurgerSuccess = (orderData) => {
    return {
      type: actionTypes.ORDER_BURGER_SUCCESS,      
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

export const orderBurger = (postData) => {   
    return dispatch => {
      dispatch(attemptOrderBurger());//action returned by attemptOrderBurger is dispatched to the store
      setTimeout( () => {
        axios.defaults.headers = getHeaders();
        let ingredients = [];
        for(let ingredient in postData.ingredients) {
          ingredients.push({
            name: ingredient,
            label: ingredient.toUpperCase(),
            quantity: postData.ingredients[ingredient]
          })
        }
        let order_data = modifyOrderData('deliveryMethod','delivery_method','zipCode','zip_code',postData.orderData)
        let orderPostData = {
          burger: {
            ingredients : ingredients,
            price: postData.price
          },
          order_data: order_data,
          user_id: postData.userId,
          archived: postData.archived.isArchived
        }

        console.log("Final Order Post--->",orderPostData)
        axios.post('/v1/orders',orderPostData)
              .then(response => {
                console.log ("Create Order Response",response);
                dispatch(orderBurgerSuccess(response.data));
                // history is accessible here since its poassed from Checkout component
              })
              .catch(error => {
                dispatch(orderBurgerFailure(error));
              });
          },500);
    };
};

export const orderInit = () => {
    return {
      type: actionTypes.ORDER_INIT
    };
};

// ********* Fetch Order actions ********
export const fetchOrdersStart = (flag) => {
  return {
      type: flag ? actionTypes.FETCH_ARCHIVE_ORDERS_START : actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = (orders, flag) => {
  return {
    type: flag ? actionTypes.FETCH_ARCHIVE_ORDERS_SUCCESS : actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailure = (error,flag) => {
  return {
    type: flag ? actionTypes.FETCH_ARCHIVE_ORDERS_FAILURE : actionTypes.FETCH_ORDERS_FAILURE,
    error: error
  };
};

// fetch order where userId=userId and archived=true
export const fetchOrders = (userId,fetchArchivedOrders) => {
    return dispatch => {
      dispatch(fetchOrdersStart(fetchArchivedOrders));
      // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
      axios.defaults.headers = getHeaders();      
      axios.get('/v1/orders/user/'+ userId,{
          params : {
            archived: fetchArchivedOrders  
          }
        }).then(res => {
            // transforming data here since we are getting this back from server. Thuis needs to be modified before sending it over to the reducer as action.orders.
            // only need orders where archived = false
            const retrievedOrders = [];
            //if fetchArchivedOrders is false then fetch orders where archived: false
            console.log("Orders--->",res);
            let orders = res.data.orders;
              for (let key in orders) {              
                  retrievedOrders.push({
                    ...orders[key],
                    id : orders[key].id
                  });
                }
            console.log("retrievedOrders:",retrievedOrders);
            dispatch(fetchOrdersSuccess(retrievedOrders,fetchArchivedOrders));
            //if fetchArchivedOrders is true then fetch orders where archived: true
          }).catch(err => {
           dispatch(fetchOrdersFailure(err,fetchArchivedOrders));
          })
    };
};

// *********** Modify Order actions ***********
export const modifyOrderStart = (flag) => {
  return {
      type: flag ? actionTypes.ARCHIVE_ORDER_START : actionTypes.UNARCHIVE_ORDER_START
  };
};

export const modifyOrderSuccess = (id, orderData,flag) => {
  return {
      type: flag ? actionTypes.ARCHIVE_ORDER_SUCCESS: actionTypes.ARCHIVE_ORDER_FAILURE,
      orderId : id,
      orderData: orderData
  };
};

export const modifyOrderFailure = (error,flag) => {
  return {
      type: flag ? actionTypes.ARCHIVE_ORDER_FAILURE : actionTypes.UNARCHIVE_ORDER_FAILURE,
      error: error
  };
};

// when we archive order then archived property of order is set to true.
export const modifyOrderState = (orderId,orderData,flag) => {
    return dispatch => {
      dispatch(modifyOrderStart(flag));
      //update archived property to true, remaining things are the same.
      axios.put('/v1/orders/' + orderId,orderData)
          .then(res => {
            // transforming data here since we are getting this back from server. Thuis needs to be modified before sending it over to the reducer as action.orders.
            console.log("Archive Order Success====>",res);
            dispatch(modifyOrderSuccess(orderId,orderData,flag));
          })
          .catch(err => {
            dispatch(modifyOrderFailure(err,flag)) ;
          })
    };
};

// ****** actions not needed ********
export const fetchArchiveOrdersStart = () => {
  return {
      type: actionTypes.FETCH_ARCHIVE_ORDERS_START
  };
};
export const fetchArchiveOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ARCHIVE_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchArchiveOrdersFailure = (error) => {
  return {
    type: actionTypes.FETCH_ARCHIVE_ORDERS_FAILURE,
    error: error
  };
};

export const unarchiveOrderStart = () => {
  return {
      type: actionTypes.UNARCHIVE_ORDER_START
  };
};
export const unarchiveOrderSuccess = (id, orderData) => {
  return {
      type: actionTypes.UNARCHIVE_ORDER_SUCCESS,
      orderId : id,
      orderData: orderData
  };
};

export const unarchiveOrderFailure = (error) => {
  return {
      type: actionTypes.UNARCHIVE_ORDER_FAILURE,
      error: error
  };
};

// when we archive order then archived property of order is set to true.
export const unarchiveOrder = (orderId,orderData) => {
    return dispatch => {
      dispatch(unarchiveOrderStart());
      //update archived property to false, remaining things are the same.
      axios.put('/v1/orders/' + orderId,orderData)
          .then(res => {
              console.log("UnArchive Order Success====>",res.data);
              dispatch(unarchiveOrderSuccess(orderId,orderData));
          })
          .catch(err => {
              dispatch(unarchiveOrderFailure(err));
          })
    };
};



// need to delete an order

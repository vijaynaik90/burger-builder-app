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
    };
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

export const fetchArchiveOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ARCHIVE_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchArchiveOrderFailure = (error) => {
  return {
    type: actionTypes.FETCH_ARCHIVE_ORDERS_FAILURE,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
      type: actionTypes.FETCH_ORDERS_START
  };
};

// fetch order where userId=userId and archived=true
export const fetchOrders = (token,userId,fetchArchivedOrders) => {
    return dispatch => {
      dispatch(fetchOrdersStart());
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
      axios.get('/orders.json'+ queryParams)
          .then(res => {
            // transforming data here since we are getting this back from server. Thuis needs to be modified before sending it over to the reducer as action.orders.
            // only need orders where archived = false
            const retrievedOrders = [];
            //if fetchArchivedOrders is false then fetch orders where archived: false
            if(!fetchArchivedOrders){
              for (let key in res.data) {
                if(!res.data[key].archived.isArchived){
                  retrievedOrders.push({
                    ...res.data[key],
                    id : key
                  });
                }
              }
            console.log("retrievedOrders:"+ JSON.stringify(retrievedOrders));
            dispatch(fetchOrderSuccess(retrievedOrders));
            }//if fetchArchivedOrders is true then fetch orders where archived: true
            else {
              for (let key in res.data) {
                if(res.data[key].archived.isArchived){
                  retrievedOrders.push({
                    ...res.data[key],
                    id : key
                  });
                }
              }
            console.log("retrievedOrders:"+ JSON.stringify(retrievedOrders));
            dispatch(fetchArchiveOrderSuccess(retrievedOrders));
            }
            
          })
          .catch(err => {
           fetchArchivedOrders ? dispatch(fetchArchiveOrderFailure(err)): dispatch(fetchOrderFailure(err));
          })
    };
};


export const archiveOrderStart = () => {
  return {
      type: actionTypes.ARCHIVE_ORDER_START
  };
};

export const archiveOrderSuccess = (id, orderData) => {
  return {
      type: actionTypes.ARCHIVE_ORDER_SUCCESS,
      orderId : id,
      orderData: orderData
  };
};

export const archiveOrderFailure = (error) => {
  return {
      type: actionTypes.ARCHIVE_ORDER_FAILURE,
      error: error
  };
};

// when we archive order then archived property of order is set to true.
export const archiveOrder = (token,orderId,orderData) => {
    return dispatch => {
      dispatch(archiveOrderStart());
      //update archived property to true, remaining things are the same.
      //const queryParams = '?auth=' + token + '&orderBy="orderId"&equalTo="'+ orderId + '"';
      axios.put('/orders/' + orderId + '/archived.json?auth='+token,orderData)
          .then(res => {
            // transforming data here since we are getting this back from server. Thuis needs to be modified before sending it over to the reducer as action.orders.
            console.log("Archive Order====>" + JSON.stringify(res.data));
              dispatch(archiveOrderSuccess(orderId,orderData));
          })
          .catch(err => {
            dispatch(archiveOrderFailure(err));
          })
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
export const unarchiveOrder = (token,orderId,orderData) => {
    return dispatch => {
      dispatch(unarchiveOrderStart());
      //update archived property to true, remaining things are the same.
      //const queryParams = '?auth=' + token + '&orderBy="orderId"&equalTo="'+ orderId + '"';
      axios.put('/orders/' + orderId + '/archived.json?auth='+token,orderData)
          .then(res => {
              console.log("UnArchive Order====>" + JSON.stringify(res.data));
              dispatch(unarchiveOrderSuccess(orderId,orderData));
          })
          .catch(err => {
              dispatch(unarchiveOrderFailure(err));
          })
    };
};



// need to delete an order

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
// Probably add a new property archived which takes true or false, store it with every order when ordered from ContactData container.
const initialState = {
  orders: [],
  loading: false,
  isOrdered : false,
  showArchivedOrders: false,
  archiveUnarchiveSuccess: false // indicates whether archive/unarchive order operation was successful
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
            return updateObject (state, {loading: true, archiveUnarchiveSuccess: false});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject (state, {
                loading: false,
                orders: action.orders,
                showArchivedOrders: false                
            });
        case actionTypes.FETCH_ORDERS_FAILURE:
            return updateObject (state, {loading: false, showArchivedOrders: false});
        // archive orders.
        case actionTypes.FETCH_ARCHIVE_ORDERS_START:
            return updateObject (state, {loading: true, archiveUnarchiveSuccess: false});
        case actionTypes.FETCH_ARCHIVE_ORDERS_SUCCESS:
            return updateObject (state, {
                loading: false,
                orders: action.orders,
                showArchivedOrders: true                
            });
        case actionTypes.FETCH_ARCHIVE_ORDERS_FAILURE:
            return updateObject (state, {loading: false, showArchivedOrders: true});
        // archive order
        case actionTypes.ARCHIVE_ORDER_START:
            return updateObject (state, {loading: true, archiveUnarchiveSuccess: false});
        case actionTypes.ARCHIVE_ORDER_FAILURE:
            return updateObject (state, {loading: false, archiveUnarchiveSuccess: false});
        case actionTypes.ARCHIVE_ORDER_SUCCESS:
                return updateObject (state, {loading: false, archiveUnarchiveSuccess: true});
        // unarchive order
        case actionTypes.UNARCHIVE_ORDER_START:
            return updateObject (state, {loading: true, archiveUnarchiveSuccess: false});
        case actionTypes.UNARCHIVE_ORDER_FAILURE:
            return updateObject (state, {loading: false, archiveUnarchiveSuccess: false});
        case actionTypes.UNARCHIVE_ORDER_SUCCESS:
                return updateObject (state, {loading: false, archiveUnarchiveSuccess: true});
        default:
            return state;
    }
};


export default reducer;

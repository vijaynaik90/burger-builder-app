import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// not saving refresh token for now. Need to implement it later.
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authLogout = (state,action) => {
    return updateObject (state, {
      token: null,
      userId: null
    });
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return updateObject(state, {loading: true, error: null});
      case actionTypes.AUTH_SUCCESS:
        return updateObject(state, {loading: false, error: null,token: action.idToken,userId: action.userId});
      case actionTypes.AUTH_FAILURE:
        return updateObject(state, {loading: false, error: action.error});
      case actionTypes.AUTH_LOGOUT:
        return authLogout(state,action);
      default:
        return state;
    }
};

export default reducer;

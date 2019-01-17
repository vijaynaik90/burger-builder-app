import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

// not saving refresh token for now. Need to implement it later.
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectUrl: '/'
};

const authLogout = (state,action) => {
    return updateObject (state, {
      token: null,
      userId: null
    });
}

const setAuthRedirectUrl = (state,action) => {
    return updateObject (state, {authRedirectUrl: action.url})
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
      case actionTypes.SET_AUTH_REDIRECT_URL:
          return setAuthRedirectUrl (state,action);
      default:
        return state;
    }
};

export default reducer;

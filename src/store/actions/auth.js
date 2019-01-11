import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
    };
};

export const authFailure = (error) => {
    return {
      type: actionTypes.AUTH_FAILURE,
      error: error
    };
};
// isSignUp is used to identify sign in or sign up
export const attemptAuth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
          email: email,
          password: password,
          returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB_gD5yrWom_glSX99atyl2KAbZpGNOh-M'
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB_gD5yrWom_glSX99atyl2KAbZpGNOh-M'
        }
        axios.post (url,authData)
              .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
              })
              .catch ( err => {
                  console.log(err);
                  dispatch(authFailure(err.response.data.error));//after aanalyzing the err object given by firebase. found the exact path to error message.
              })
      };
};

export const logout = () => {
    return {
      type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiryTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    },expiryTime*1000);
  };
};

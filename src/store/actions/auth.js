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
                //convert current date to milliseconds and then add expiresIn time in milliseconds.
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
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
  //remove the localStorage tokens from the browser upon logout.
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
    return {
      type: actionTypes.AUTH_LOGOUT
    }
}

//expiryTime is in Seconds here. need to convert into milliseconds.
export const checkAuthTimeout = (expiryTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    },expiryTime*1000);
  };
};

export const setAuthRedirectUrl = (url) => {
    return {
      type: actionTypes.SET_AUTH_REDIRECT_URL,
      url: url
    };
};

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if(!token) {
        dispatch(logout());
      } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if( expirationDate > new Date()) {
          // auth success
          const userId = new Date(localStorage.getItem('userId'));
          dispatch(authSuccess(token,userId));
          // convert milliseconds to seconds since checkAuthTimeout expects time in seconds
          dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        } else {
          // logout since token has become stale.
          dispatch(logout());
        }
      }
  };
};

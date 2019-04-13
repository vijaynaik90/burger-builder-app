import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { ACCESS_TOKEN } from '../../shared/constants';
import { getHeaders } from '../../shared/utility';
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
export const attemptAuth = (authData, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = '/auth/signup'
        if(!isSignUp){
            url = '/auth/signin'
        }
        axios.defaults.headers = getHeaders();
        axios.post (url,authData)
              .then(res => {
                //convert current date to milliseconds and then add expiresIn time in milliseconds.
                // const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);                
                if(isSignUp && res.status === 201){
                  localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
                  localStorage.setItem('userId', res.data.userId);
                  dispatch(authSuccess(res.data.accessToken,res.data.userId));
                }
                if(!isSignUp && res.status === 200) {
                  localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
                  localStorage.setItem('userId', res.data.userId);
                  dispatch(authSuccess(res.data.accessToken,res.data.userId));
                }
              })
              .catch ( err => {
                //TODO: add 401 case                                  
                  dispatch(authFailure(err));//after aanalyzing the err object given by firebase. found the exact path to error message.
              })
      };
};

export const logout = () => {
  //remove the localStorage tokens from the browser upon logout.
  localStorage.removeItem(ACCESS_TOKEN);
  // localStorage.removeItem('expirationDate');
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
      const token = localStorage.getItem(ACCESS_TOKEN);
      const userId = localStorage.getItem('userId');
      if(!token) {        
        dispatch(logout());
      } else {
        axios.defaults.headers = getHeaders();
        // call /api/user/me and if it returns 401 then logout user
        axios.get('/v1/user/me')
              .then(response => {
                if(response.status !== 200){
                  if(response.status === 401){
                    dispatch(logout());
                  }
                }else{
                  dispatch(authSuccess(token,userId));
                }
              })
              .catch(err => {
                //TODO: reset localStorage when cannot connect to backend server.
                dispatch(authFailure(err));
                dispatch(logout());
              })
      }
  };
};

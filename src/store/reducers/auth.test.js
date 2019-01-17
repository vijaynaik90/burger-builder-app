import React from 'react';
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


// enzyme allows to render NavigationItems standalone independent of the react app for testing.



describe ('auth reducer', () => {
  //let wrapper;
// need to set onInitIngredients prop before the BurgerBuilder is shallow mounted.
  // beforeEach(() => {
  //   wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  // });
  it ('should return initial State', () => {
    expect(reducer(undefined,{})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectUrl: '/'
    });
  });

  it('should store token upon login', () => {
      expect(reducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectUrl: '/'
      },{
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'abc',
        userId: 'xyz'
      })).toEqual({
        token: 'abc',userId: 'xyz',error: null,loading: false,authRedirectUrl: '/'
      });
  });
});

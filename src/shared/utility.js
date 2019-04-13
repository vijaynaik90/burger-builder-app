import { ACCESS_TOKEN } from './constants';

export const updateObject = (oldState, updatedValues) => {
    return {
      ...oldState,
      ...updatedValues
    };
};

export const checkValidity = (value,rules) => {
  let isValid = true;

  if(rules.required) {
      isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if(rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }

  return isValid;
};

export const inputStateChange = (controls, event, controlName) => {
// this will not not create a deep clone i.e next objects within orderForm will still be mutable.
  // Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
  const updatedControls = updateObject(controls, {
    [controlName]: updateObject (controls[controlName],{
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[controlName].validation),
      touched: true
    })
  });
  return updatedControls;
};

export const getHeaders = () => {
  let headers = {
      'Content-Type': 'application/json'
    };  
  if(localStorage.getItem(ACCESS_TOKEN)) {   
    headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
  }  
  return headers;
};

export const modifyOrderData = (oldKey1, newKey1,oldKey2,newKey2,{[oldKey1]: old1,[oldKey2]: old2, ...others}) => {
  return {
    [newKey1]: old1,
    [newKey2]: old2,
    ...others
  };
};

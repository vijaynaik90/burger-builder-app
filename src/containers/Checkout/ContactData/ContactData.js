import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from  '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderBurgerActions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true,
            valid:false
          },
          touched:false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street Name'
          },
          value: '',
          validation: {
            required: true,
            valid:false
          },
          touched:false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
          },
          value: '',
          validation: {
            required: true,
            valid:false,
            minLength:5,
            maxLength:7
          },
          touched:false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true,
            valid:false
          },
          touched:false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: '',
          validation: {
            required: true,
            valid:false
          },
          touched:false
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value:'fastest',displayValue:'Fastest'},
              {value:'cheapest',displayValue:'Cheapest'}
            ]
          },
          validation: {
            valid:true
          },
          value: 'fastest',
          touched:false
        }
    },formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();//prevents reloading of page.
    let formElementValues = {};
    for (let element in this.state.orderForm) {
      formElementValues[element] = this.state.orderForm[element].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formElementValues,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order,this.props.token);
  }

  checkValidity(value,rules){
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
  }

  inputChangedHandler = (event,inputIdentifier) => {
// this will not not create a deep clone i.e next objects within orderForm will still be mutable.
// Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
    const updatedOrderForm = {
      ...this.state.orderForm
      };
//this will makje the nested objects immutablle withjin orderForm object
  const updatedFormElement = {
    ...this.state.orderForm[inputIdentifier]
    };

  const updatedValidation = {
    ...updatedFormElement.validation
  }
  updatedFormElement.value = event.target.value;
  //updated touched property of form element to true.
  updatedFormElement.touched = true;
  updatedValidation.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
  updatedFormElement.validation = updatedValidation;
  let formIsValid = true;
  for (let i in updatedOrderForm) {
    formIsValid = updatedOrderForm[i].validation.valid && formIsValid;
  }
  updatedOrderForm[inputIdentifier] = updatedFormElement;
  this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});

  }
  render () {
    //need an array of JS objects such as {id:key,config:value} with id as key in orderForm. Eg:name,street etc.
    //config property should hold the value for name,street etc within orderForm.
    let formInputElemements = [];
    for (let key in this.state.orderForm) {
      formInputElemements.push({
          id: key,
          config: this.state.orderForm[key]
      }
      );
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formInputElemements.map(x =>(
          <Input
            key={x.id}
            elementtype ={x.config.elementType}
            elementconfig={x.config.elementConfig}
            value={x.config.value}
            invalid={!x.config.validation.valid}
            touched={x.config.touched}
            shouldValidate={x.config.validation.required ? x.config.validation.required : false }
            changed={(event) => this.inputChangedHandler(event,x.id)} />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
    </form>
  );

    if(this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter contact data</h4>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onOrderBurger: (orderData, token) => dispatch(orderBurgerActions.orderBurger(orderData, token))
    };

};
const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));

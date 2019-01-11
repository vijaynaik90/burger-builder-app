import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from  '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';

//TODO: map different error messages to codes.
class Auth extends Component {
    state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Email Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid:false,
          touched:false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength:6
          },
          valid:false,
          touched:false
        }
      },
      isSignUp: true
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

    inputChangedHandler = (event, controlName) => {
  // this will not not create a deep clone i.e next objects within orderForm will still be mutable.
  // Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
      const updatedControls = {
        ...this.state.controls,
        [controlName] : {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        }
        };

      this.setState({controls: updatedControls});

    }

    submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModehandler = () => {
      this.setState(prevState => {
        return  {isSignUp: !prevState.isSignUp};
      })
    }


    render() {

      let formInputElemements = [];
      for (let key in this.state.controls) {
        formInputElemements.push({
            id: key,
            config: this.state.controls[key]
        }
        );
      }
      let form =  <Spinner />;
      if(!this.props.loading) {
        form = formInputElemements.map(x => (
          <Input
              key={x.id}
              elementtype ={x.config.elementType}
              elementconfig={x.config.elementConfig}
              value={x.config.value}
              invalid={!x.config.valid}
              touched={x.config.touched}
              shouldValidate={x.config.validation}
              changed={(event) => this.inputChangedHandler(event,x.id)} />
        ));
      }
      let errorMessage = null;
      if(this.props.error) {
        errorMessage = (
            <p> {this.props.error.message} </p>
        );
      }

        return (
          <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success" >SUBMIT</Button>
            </form>
            <Button
              clicked={this.switchAuthModehandler}
              btnType="Danger">Switch To {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
          loading: state.auth.loading,
          error: state.auth.error

    };
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email,password, isSignUp) => dispatch (actions.attemptAuth(email,password,isSignUp))
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Auth);
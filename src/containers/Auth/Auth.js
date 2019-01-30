import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Input from  '../../components/UI/Input/Input';
import ButtonComponent from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
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
    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectUrl !== '/') {
          this.props.onSetAuthRedirectUrl();
        }
    }

    inputChangedHandler = (event, controlName) => {
  // this will not not create a deep clone i.e next objects within orderForm will still be mutable.
  // Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
      const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject (this.state.controls[controlName],{
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        })
      });
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
      let loginRedirect = null
      if( this.props.isAuthenticated){
        loginRedirect = <Redirect to={this.props.url} />
      }

        return (
          <div className={classes.Auth}>
            {loginRedirect}
            {errorMessage}
            <form onSubmit={this.submitHandler}>
              {form}
              <Button bsStyle="success" bsSize="medium">SUBMIT</Button>
            </form>
            <ButtonComponent
              clicked={this.switchAuthModehandler}
              btnType="Danger">Switch To {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</ButtonComponent>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
          loading: state.auth.loading,
          error: state.auth.error,
          isAuthenticated: state.auth.token !== null,
          url: state.auth.authRedirectUrl,
          buildingBurger: state.burgerBuilder.building
    };
};
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email,password, isSignUp) => dispatch (actions.attemptAuth(email,password,isSignUp)),
      onSetAuthRedirectUrl: () => dispatch (actions.setAuthRedirectUrl('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Auth);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink,Redirect } from 'react-router-dom';
import { Col,Container, Form, FormGroup, Label,Input,FormFeedback,Button} from 'reactstrap'
// import Input from  '../../components/UI/Input/Input';
import ButtonComponent from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { inputStateChange } from '../../shared/utility';
//TODO: map different error messages to codes.
class Auth extends Component {
    state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'test@test.com',
            label:'Email Address or Username',
            id:"loginEmail"
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid:false,
          feedback: {
            success: 'Email Address or Username looks correct',
            failure: 'Uh oh! Looks like there is an issue with your email. Please input a correct email.'
          },          
          touched:false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: '********',
            label: 'Password',
            id:"loginPassword"
          },
          value: '',
          validation: {
            required: true,
            minLength:6
          },
          valid:false,
          feedback: {
            success: '',
            failure: 'Password must be atleast 6 characters.'
          },
          touched:false
        }
      },
      isSignUp: false
    }
    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectUrl !== '/') {
          this.props.onSetAuthRedirectUrl();
        }
    }

    inputChangedHandler = (event, controlName) => {
  // this will not not create a deep clone i.e next objects within orderForm will still be mutable.
  // Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
      const updatedControls = inputStateChange(this.state.controls,event,controlName);
      this.setState({controls: updatedControls});
      console.log (this.state.controls);
    }

    submitHandler = (event) => {
      event.preventDefault();
      const authData = {
        usernameOrEmail: this.state.controls.email.value,
        password: this.state.controls.password.value          
      }
      this.props.onAuth(authData,this.state.isSignUp);
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
      let feedback = null;
      if(!this.props.loading) {
        form = formInputElemements.map(x => (
          <Col key={x.id}>
                <FormGroup>
                  <Label>{x.config.elementConfig.label}</Label>
                  <Input
                    type={x.config.elementConfig.type}
                    name={x.config.elementConfig.type}
                    id={x.config.elementConfig.id}
                    placeholder={x.config.elementConfig.placeholder}
                    value={x.config.value}
                    // valid={x.config.valid}
                    invalid={!x.config.valid}
                    // touched={x.config.touched}
                    // shouldValidate={x.config.validation}
                    onChange={(event) => this.inputChangedHandler(event,x.id)} 
                    />
                    {!x.config.valid && <span>{x.config.feedback.failure}</span> }
                    {/* <FormFeedback>
                      {x.config.feedback.failure}
                    </FormFeedback> */}
                </FormGroup>
                </Col>
          // <Input
          //     key={x.id}
          //     elementtype ={x.config.elementType}
          //     elementconfig={x.config.elementConfig}
          //     value={x.config.value}
          //     invalid={!x.config.valid}
          //     touched={x.config.touched}
          //     shouldValidate={x.config.validation}
          //     changed={(event) => this.inputChangedHandler(event,x.id)} />
        ));
      }
      let errorMessage = null;
      if(this.props.error) {
        let status = this.props.error.response.status;
        if(status === 401) {
          errorMessage = (
            <p> Username or Password is incorrect </p>
        );
        } else {
          errorMessage = (
              <p> 'Sorry! Something went wrong. Please try again!' </p>
          );
        }        
      }
      let loginRedirect = null
      if( this.props.isAuthenticated){
        loginRedirect = <Redirect to={this.props.url} />
      }

        return (        
            <Container className={classes.Auth}>
              <h2> Sign In</h2>
              {loginRedirect}
              {errorMessage}
              <Form className={classes.form} onSubmit={this.submitHandler}>
                {form}
                <Button color='success'>SUBMIT</Button>
              </Form>
              <br />
              <p>Click here to <NavLink className="btn btn-theme btn-sm btn-min-block" to="/signup" exact>Register</NavLink> </p>
            </Container>


          // <div className={classes.Auth}>
          //   {loginRedirect}
          //   {errorMessage}
          //   <form onSubmit={this.submitHandler}>
          //     {form}
          //     <ButtonComponent 
          //       btnType="Success">SUBMIT
          //     </ButtonComponent>
          //   </form>
          //   <br />
          //   <p>Click here to <NavLink className="btn btn-theme btn-sm btn-min-block" to="/signup" exact>Register</NavLink> </p>
          // </div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink,Redirect } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import { inputStateChange } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
const STATES = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

class Signup extends Component {
    state = {
        controls: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Name'
            },
            value: '',
            validation: {
              required: true,
              minLength:3
            },
            valid:false,
            touched:false
          },
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
          username: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Username'
            },
            value: '',
            validation: {
              required: true,
              minLength:4
            },
            valid:false,
            touched:false
        },
        street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Street'
            },
            value: '',
            validation: {
              required: false
            },
            valid:false,
            touched:false
        },
        city: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'City'
            },
            value: '',
            validation: {
              required: false
            },
            valid:false,
            touched:false
        },
        state: {
            elementType: 'select',
            elementConfig: {
              options: STATES.map(state => {
                  return {value: state,displayValue: state}
              })              
            },
            value: '',
            validation: {
              required: false
            },
            valid:false,
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
              required: false,
              minLength:5,
              maxLength:7
            },
            valid:false,
            touched:false
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'A password between 6 to 20 characters'
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
        formIsValid: false
      }
    
    componentDidMount () {
        // if not building burger and redirect url is not '/' then set redirect url
        if(!this.props.buildingBurger && this.props.authRedirectUrl !== '/') {
            this.props.onSetAuthRedirectUrl();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const authData = {
            name: this.state.controls.name.value,
            username: this.state.controls.username.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onAuth(authData,true);
        this.props.history.push("/auth");
      }
    
    inputChangedHandler = (event, controlName) => {
    // this will not not create a deep clone i.e next objects within orderForm will still be mutable.
    // Eg: If you change updatedOrderForm.name then this.state.orderForm.name will also be changed.
        const updatedControls = inputStateChange(this.state.controls,event,controlName);
        this.setState({controls: updatedControls});
        }

    render() {
        let formInputElements = [];
        const titleStyle = {
            fontWeight: '600',
            color: '#4d4d4d',
            fontSize:'2.2em'
        };

        for(let key in this.state.controls) {
            formInputElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form =  <Spinner />;

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p> {this.props.error.message} </p>
            );
        }
        let success = null
        if( this.props.isAuthenticated){
            success = <Redirect to={this.props.url} />
        }
        if(!this.props.loading) {
            form = formInputElements.map(x => (
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
        return (
            <div className="container">
                {success}
                {errorMessage}
                <div style={{marginTop:'50px'}} className="panel panel-default">
                    <div className="panel-heading clearfix">
                    <h3 style={titleStyle} className="panel-title pull-left">Sign Up Form</h3>
                        <div className="pull-right">
                            <label className="checkbox-inline">
                            <input type="checkbox"
                                // checked={this.state.email}
                                // onChange={this.handleChange.bind(this, 'email')}
                            /> Phone Number
                            </label>
                            <label className="checkbox-inline">
                            <input type="checkbox"
                                // checked={this.state.question}
                                // onChange={this.handleChange.bind(this, 'question')}
                            /> Question
                            </label>
                        </div>
                    </div>
                    
                    <div className="panel-body">
                        <div className = "form-horizontal">                            
                                {form}
                        </div>
                    </div>
                    <div className="panel-footer">
                        <button type="button" className="btn btn-lg btn-success btn-block" onClick={this.submitHandler}>Submit</button>
                    </div>
                </div>        
                <div style={{fontSize:'15px'}}>Already registed? <NavLink to="/auth"><strong style={{color:'#B22222'}}>Login Here!</strong></NavLink></div>
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

export default connect(mapStateToProps,mapDispatchToProps) (Signup);

import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { NavLink,Redirect } from 'react-router-dom';
import * as yup from 'yup';
import * as actions from '../../../store/actions/index';
import {Input,Title,Button,Label,Text} from './login-styled';

class Login extends Component {
    state = {
        isSignUp: false
    }
    render() {
        let loginRedirect = null
        if( this.props.isAuthenticated){
            loginRedirect = <Redirect to={this.props.url} />
        }

        // let form =  <Spinner />;      

        const SignupSchema = yup.object().shape({
            password: yup.string()
                .min(6, "Password must be atlest 6 charcters long")
                .max(50, "Password Too Long!")
                .required("Password Required"),
            email: yup.string()
                .email("Invalid E-mail")
                .required("Email Required")
            })
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
        return (
            <div className="container">
                <div className="row">
                {loginRedirect}
                    <Formik 
                        initialValues= {{email:"",password:""}}
                        validationSchema={SignupSchema}
                        onSubmit={(values,actions) => {
                            // event.preventDefault();
                            const authData = {
                            usernameOrEmail: values.email,
                            password: values.password          
                            }
                            this.props.onAuth(authData,this.state.isSignUp);
                            actions.setSubmitting(false);
                            actions.resetForm({email:"",password:""});
                        }}
                        render = {
                            (
                                {
                                    touched,
                                    errors,
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    handleBlur
                                }
                            ) => (
                                    <div style={{marginTop:'50px'}} className="col-md-6 col-md-offset-3">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                {errorMessage}
                                                <Title>Sign In</Title>
                                            </div>
                                            <div className="panel-body">
                                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <Label className="col-sm-3 control-label">
                                                            Email Address </Label>
                                                        <div className="col-sm-9">
                                                            <Input 
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                                border={touched.email && errors.email && "1px solid red"}
                                                                type="text"
                                                                name="email"
                                                                placeholder="example@example.com"
                                                            />
                                                            {touched.email && errors.email && <Text color="red">{errors.email}</Text>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <Label className="col-sm-3 control-label">Password</Label>
                                                        <div className="col-sm-9">
                                                            <Input 
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                border={touched.password && errors.password && "1px solid red"}
                                                                type="password"
                                                                name="password"
                                                                placeholder="******"
                                                            />
                                                            {touched.password && errors.password && <Text color="red">{errors.password}</Text>}
                                                        </div>
                                                    </div>                                            
                                                    <div className="form-group">
                                                        <div className="col-sm-offset-3 col-sm-9">
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox"/>
                                                                    Remember me
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group last">
                                                        <div className="col-sm-offset-3 col-sm-9">
                                                            <Button type="submit">Submit</Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="panel-footer">
                                                Not Registered? <NavLink to="/signup"><strong style={{color:'#FF6347'}}>Register NOW!! </strong></NavLink>
                                            </div>
                                        </div>
                                    </div>                            
                            )
                        }
                    ></Formik>
                </div>
            </div>
                  
        //         <br />
        //       <p>Click here to <NavLink className="btn btn-theme btn-sm btn-min-block" to="/signup" exact>Register</NavLink> </p>
        //         </div>
        //       </div>
        //   </div>
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

export default connect(mapStateToProps,mapDispatchToProps) (Login);
    

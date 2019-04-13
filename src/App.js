import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import Home from './containers/Home/Home';
import Footer from './components/UI/Footer/Footer';
import Signup from './containers/Auth/Signup/Signup';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncArchivedOrders = asyncComponent(() => {
  return import('./containers/Orders/ArchivedOrders/ArchivedOrders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Login/Login')
});

const asyncOrderDetails = asyncComponent(() => {
  return import('./containers/Orders/OrderDetails/OrderDetails')
});
class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

// App container is always loaded no matter which page is loaded.
// Wrapping App container with connect can break the app. So we need to wrap this with a higher order component withRouter.
// withRouter will ensure props being passed to the APp container
  render() {
    // any unknown routes redirects us to main page ('/').
    // Since /orders and /checkout is unknow if user is not logged in they will redirect to /.
    // need to load Auth component upon sign in/sign up since the redirect logic is in Auth component
    let routes  = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" exact component={asyncOrders} />
        <Route
                path='/orders/:id'
                component= {asyncOrderDetails} />
        <Route path="/archived-orders" component={asyncArchivedOrders} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    }
    return (         
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
        <Footer> <span><h2> This is footer</h2></span> </Footer>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));

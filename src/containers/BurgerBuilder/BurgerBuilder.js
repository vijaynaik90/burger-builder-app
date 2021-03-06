import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

// named export which gives access to this class in tests.
export class BurgerBuilder extends Component {

  //gets called after the render() method.
  // Since BurgerBuilder is called from a Route class, it has access to history,location and match objects within its props.
  // Burger component wont have to those objects since its called from within BurgerBuilder.
  // Using the special withRouter named component we can have access to history,location and match objects within Burger component as well.
  componentDidMount () {
    // calling the FIREBASE REST API is done in actionCreators.
    //call on init ingredients only if total ingredient count is not 0.
    this.props.onInitIngredients();
  }
  state = {
    orderNowClicked: false
  }

  updateOrderState = (updatedIngredients) => {
    const ingredients = {
      ...updatedIngredients
    };

    const sum = Object.keys(ingredients)
                      .map(ingredient => {
                          return ingredients[ingredient];
                      }).reduce((sum,el) => {
                        return sum + el;
                      },0);

    return sum > 0;
  }

// the below syntax will not correctly because this keyword cannot be accessed inside this method.
// Will have to create the method using the arrow function
  // toggleOrderNowHandler () {
  //   this.setState ({orderNowClicked:true});
  // }

// arrow functions contains the state or context of this keyword.
// If orderNowClicked is true then Modal will be shown.
  toggleOrderNowHandler = () => {
  // show Modal, hence the orderSummary only if user is isAuthenticated
  // if not auth then send user to auth page
    if(this.props.isAuthenticated) {
      this.setState ({orderNowClicked:true});
    } else {
      this.props.onSetAuthRedirectUrl('/checkout');
      this.props.history.push('/auth');
    }
  }

  cancelOrderHandler = () => {
    this.setState({orderNowClicked:false})
  }

  orderContinueHandler = () => {
    // ?salad=1&bacon=2
    // Removing code related to query params since we are managing state with redux now.
    this.props.onOrderInit();
    this.props.history.push ({ pathname: '/checkout' });
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    };// this statemnt copies the ingredients object in an immutable way.

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.props.error ? <p> Cannot load ingredients!!</p> : <Spinner />
    if (this.props.ings) {
      burger = (
              <Aux>
                <Burger ingredients={this.props.ings}/>
                  <BuildControls
                    isAuthenticated={this.props.isAuthenticated}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    toggleOrderNow={this.toggleOrderNowHandler}
                    canOrder={this.updateOrderState(this.props.ings)} />
              </Aux>
            );
      orderSummary = <OrderSummary ingredients={this.props.ings}
                                   orderCancelled={this.cancelOrderHandler}
                                   orderContinue={this.orderContinueHandler}
                                   price={this.props.price} />;

     if(this.state.loading) {
       orderSummary = <Spinner />;
     }
    }
    console.log("[BurgerBuilder.js] render BurgerBuilder");
    
    return (
      //return some JSX code
      <Aux>
        <Modal show={this.state.orderNowClicked} modalClosed={this.cancelOrderHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    //need to do state.burgerBuilder here since we are accessing the sliced state from burgerBuilder reducer.
    // This is defined in index.js as an argument to combineReducers function.
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

//receives dispatch funtion as argument
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
    onIngredientRemoved: (name) => dispatch (actions.removeIngredient(name)),
    onInitIngredients: () => dispatch (actions.initIngredients()),
    onOrderInit: () => dispatch (actions.orderInit()),
    onSetAuthRedirectUrl: (url) => dispatch (actions.setAuthRedirectUrl(url))
  };
};

//you can have as many hoc as you want.
// connect will just set some props on the component it is wrapping.
// So props will be passed due to the <WrappedComponent {...this.props} /> in the withErrorHandler.js file.
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));

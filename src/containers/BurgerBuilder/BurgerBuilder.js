import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  //gets called after the render() method.
  // Since BurgerBuilder is called from a Route class, it has access to history,location and match objects within its props.
  // Burger component wont have to those objects since its called from within BurgerBuilder.
  // Using the special withRouter named component we can have access to history,location and match objects within Burger component as well.
  componentDidMount () {
    //commenting this for now. Later, will be used when we load asynchronously.
    // axios.get('https://burger-builder-baefa.firebaseio.com/ingredients.json')
    //      .then(response => {
    //         this.setState({ingredients: response.data});
    //       })
    //       .catch(error => {
    //         this.setState({error: error});
    //       });
  }
  state = {
    orderNowClicked: false,
    loading:false,
    error: false
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

// arrow functions contains the state or context of this keyword
  toggleOrderNowHandler = () => {
    this.setState ({orderNowClicked:true});
  }

  cancelOrderHandler = () => {
    this.setState({orderNowClicked:false})
  }

  orderContinueHandler = () => {
    // ?salad=1&bacon=2
    // Removing code related to query params since we are managing state with redux now.
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

    let burger = this.state.error ? <p> Cannot load ingredients!!</p> : <Spinner />
    if (this.props.ings) {
      burger = (
              <Aux>
                <Burger ingredients={this.props.ings}/>
                  <BuildControls
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

//receives dispatch funtion as argument
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: name}),
    onIngredientRemoved: (name) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
  };
};

//you can have as many hoc as you want.
// connect will just set some props on the component it is wrapping.
// So props will be passed due to the <WrappedComponent {...this.props} /> in the withErrorHandler.js file.
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));

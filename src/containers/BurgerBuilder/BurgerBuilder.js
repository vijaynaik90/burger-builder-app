import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon:1.3
};

class BurgerBuilder extends Component {

  // constructor(props) {
  //   super(props);
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    canOrder: false,
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
    this.setState({canOrder: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount +1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAdditon = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAdditon;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updateOrderState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0)
      return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updateOrderState(updatedIngredients);
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
    alert ('You can continue');
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };// this statemnt copies the ingredients object in an immutable way.

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      //return some JSX code
      <Aux>
        <Modal show={this.state.orderNowClicked} modalClosed={this.cancelOrderHandler}>
          <OrderSummary ingredients={this.state.ingredients}
            orderCancelled={this.cancelOrderHandler}
            orderContinue={this.orderContinueHandler}
            price={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          toggleOrderNow={this.toggleOrderNowHandler}
          canOrder={this.state.canOrder}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;

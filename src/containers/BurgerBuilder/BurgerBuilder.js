import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon:1.3
};

class BurgerBuilder extends Component {

  //gets called after the render() method.
  componentDidMount () {
    axios.get('https://burger-builder-baefa.firebaseio.com/ingredients.json')
         .then(response => {
            this.setState({ingredients: response.data});
          })
          .catch(error => {
            this.setState({error: error});
          });
  }
  state = {
    ingredients: null,
    totalPrice: 5,
    canOrder: false,
    orderNowClicked: false,
    loading:false,
    error: null
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
    // TODO: Navigate to checkout form.
    this.setState({loading:true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer : {
        name:'Vijay Naik',
        address: {
          street:'1111 Main Street',
          zipCode: '122121',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json',order)
          .then(response => {
            this.setState({loading:false,orderNowClicked:false});
          })
          .catch(error => {
            this.setState({loading:false,orderNowClicked:false});
          });

  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };// this statemnt copies the ingredients object in an immutable way.

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;




    let burger = this.state.error ? <p> Cannot load ingredients!!</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
              <Aux>
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
      orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                   orderCancelled={this.cancelOrderHandler}
                                   orderContinue={this.orderContinueHandler}
                                   price={this.state.totalPrice} />;

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

export default withErrorHandler(BurgerBuilder,axios);

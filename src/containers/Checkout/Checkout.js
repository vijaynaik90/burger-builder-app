import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // TODO: summary of checkout. what to buy and price. Button to cancel and continue.
  // summary show the actual burger. instead of listing items.

  state = {
    ingredients:null,
    totalPrice: 0
  }

  componentWillMount () {
    const queryObject = new URLSearchParams(this.props.location.search);//extract search String (i.e query String).
    const burgerIngredients = {};
    let price = 0;
    for (let ingredient of queryObject.entries()) {
      //each entry has this format ['salad','1'], so obj[0] has the ingredient name and obj[1] has ingredient value.
      if(ingredient[0] === 'price') {
        price = ingredient[1];
      }else {
        burgerIngredients[ingredient[0]] = +ingredient[1];
      }

    }
    this.setState({ingredients: burgerIngredients,totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  // props here is passed to the unnamed function so that the history object can be accessible from the ContactData component.
  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler} />
        <Route
          path={this.props.match.path +'/contact-data'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />

      </div>
    );
  }
}

export default Checkout;

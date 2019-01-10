import React, { Component } from 'react';
import { Route,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
  // TODO: summary of checkout. what to buy and price. Button to cancel and continue.
  // summary show the actual burger. instead of listing items.
  // removed local UI state and componentWillMount since we can fetch state from redux now
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  // props here is passed to the unnamed function so that the history object can be accessible from the ContactData component.
  render () {
    let summary = <Redirect to="/" />
    if(this.props.ings) {
      const orderedRedirect = this.props.isOrdered ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {orderedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinueHandler} />
          <Route
            path={this.props.match.path +'/contact-data'}
            component= {ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,//price is not needed in this component
    isOrdered: state.order.isOrdered
  }
};

//if mapStateToProps was null and mapDispatchToProps not null then use connect(null,mapDispatchToProps) since first argument always has to be mapStateToProps.
export default connect(mapStateToProps) (Checkout);

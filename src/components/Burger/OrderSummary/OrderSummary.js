import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
// This clould be a functional component as well.

  render () {
    const ingredientArray = Object.keys(this.props.ingredients)
                                  .map(ingredient => {
                                    return <li key={ingredient}>
                                      <span style = {{textTransform:'capitalize'}}> {ingredient} </span> : {this.props.ingredients[ingredient]}
                                    </li>
                                  });

    return (
      //adding btnType value based on the class Names in Button.css file
      //toFixed(x) will display x decimal places
      <Aux>
        <h3> Your Order</h3>
        <p><strong> Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p> Burger Ingredients </p>
        <ul>
          {ingredientArray}
        </ul>

        <p> Continue to Checkout</p>
        <Button clicked={this.props.orderCancelled} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.orderContinue} btnType="Success">CONTINUE</Button>
      </Aux>
    );
  }

}


export default OrderSummary;

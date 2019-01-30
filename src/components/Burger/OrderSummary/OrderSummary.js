import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';



export const orderSummary = (props) => {
  const ingredientArray = Object.keys(props.ingredients)
                                  .map(ingredient => {
                                    return <li key={ingredient}>
                                      <span style = {{textTransform:'capitalize'}}> {ingredient} </span> : {props.ingredients[ingredient]}
                                    </li>
                                  });
  return (
    <Aux>
        <h3> Your Order</h3>
        <p><strong> Total Price: {props.price.toFixed(2)}</strong></p>
        <p> Burger Ingredients </p>
        <ul>
          {ingredientArray}
        </ul>
        <p> Continue to Checkout</p>
        <Button clicked={props.orderCancelled} btnType="Danger">CANCEL</Button>
        <Button clicked={props.orderContinue} btnType="Success">CONTINUE</Button>
      </Aux>
  );
}

export default orderSummary;

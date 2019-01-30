import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { Button } from 'react-bootstrap';
const controls = [
  {label:'Salad', type :'salad'},
  {label:'Bacon', type :'bacon'},
  {label:'Cheese', type :'cheese'},
  {label:'Meat', type :'meat'}
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current price:<strong>{props.price.toFixed(2)}</strong> </p>
      {
        controls.map((control) => {
        return <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}/>;
      }
      )}
      <Button
        bsStyle="success"
        bsClass={classes.OrderButton}
        disabled={!props.canOrder}
        onClick={props.toggleOrderNow}>{props.isAuthenticated ? 'Order Now!!' : 'Please Authenticate!!'}</Button>
    </div>
);

export default buildControls;

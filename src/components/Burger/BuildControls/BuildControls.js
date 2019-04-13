import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { Button } from 'react-bootstrap';
const controls = [
  {label:'Salad', name :'salad'},
  {label:'Bacon', name :'bacon'},
  {label:'Cheese', name :'cheese'},
  {label:'Meat', name :'meat'}
];
const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current price:<strong>{props.price.toFixed(2)}</strong> </p>
      {
        controls.map((control) => {
        return <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.ingredientAdded(control.name)}
          removed={() => props.ingredientRemoved(control.name)}
          disabled={props.disabled[control.name]}/>;
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

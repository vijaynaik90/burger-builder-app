import React, { Component } from 'react';
import classes from './Order.css';
import ButtonComponent from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import { Button } from 'react-bootstrap';

const order = (props) => {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
        name: ingredient,
        quantity: props.ingredients[ingredient]
      });
  }
  const ingredientOutput = ingredients.map(ig => {
    return <span
              key={ig.name}
              style={{textTransform: 'capitalize',display: 'inline-block',
                      margin: '0 8px', border: '1px solid #ccc', padding: '5px'
                    }}>{ig.name} ({ig.quantity})
              </span>;
  });
  let archiveButton = (
    <Button
      onClick={props.archiveOrderClicked}
      bsStyle="warning">Archive Order</Button>
  );
  if(props.showArchiveFlag){
    archiveButton = (
      <Button bsStyle="success"
        onClick={props.unarchiveOrderClicked}>Unarchive Order</Button>
    );
  }
// if flag is false then show Archived orders button
// else show Unarchived Order button  
  return (
    <div className={classes.Order}>
        <p>Ingrdients:{ingredientOutput} </p>
        <p>Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong> </p>
        {archiveButton}
      </div>    
  );
}

export default order;

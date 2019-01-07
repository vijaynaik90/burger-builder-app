import React, { Component } from 'react';
import classes from './Order.css';

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
              </span>
  });
  
  return (
    <div className={classes.Order}>
      <p>Ingrdients:{ingredientOutput} </p>
      <p>Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong> </p>
    </div>
  );
}

export default order;

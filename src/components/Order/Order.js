import React, { Component } from 'react';
import classes from './Order.css';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

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
  const confirmDialogBox = (
    <Aux>
      <p> Are you sure you want to archive order?</p>
      <Button clicked={props.archiveOrderCancelled} btnType="Danger">NO</Button>
      <Button clicked={props.arhiveOrderContinue  } btnType="Success">YES</Button>
    </Aux>
  );
  let archiveButton = (
    <Button
      clicked={props.archiveOrderClicked}
      btnType="Danger">Archive Order</Button>
  );
  if(props.showArchiveFlag){
    archiveButton = (
      <Button
        clicked={props.unarchiveOrderClicked}
        btnType="Danger">Unarchive Order</Button>
    );
  }
// if flag is false then show Archived orders button
// else show Unarchived Order button
  const order = (
    <Aux>
      <div className={classes.Order}>
        <p>Ingrdients:{ingredientOutput} </p>
        <p>Price: <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong> </p>
        {archiveButton}
      </div>
    </Aux>
  );
  return (
    <Aux>
      <Modal show={props.archiveClickedStatus} modalClosed={props.archiveOrderCancelled}>
        {confirmDialogBox}
      </Modal>
      {order}
    </Aux>
  );
}

export default order;

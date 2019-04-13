import React from 'react';
import classes from './Order.css';
import { ButtonToolbar,Button } from 'react-bootstrap';

const order = (props) => {

  const ingredientOutput = props.ingredients.map(ig => {
    return <span
              key={ig.name}
              style={{textTransform: 'capitalize',display: 'inline-block',
                      margin: '0 8px', border: '1px solid #ccc', padding: '5px'
                    }}>{ig.name} ({ig.quantity})
              </span>;
  });
  let archiveButton = (
    <ButtonToolbar>
      <Button
        onClick={props.buttonClicked}
        bsStyle="warning">Archive Order
      </Button>
      <Button bsStyle="primary"
              onClick={props.showOrderDetails} >View Order Details
        </Button>
    </ButtonToolbar>
    
  );
  if(props.displayArchiveOrders){
    archiveButton = (      
        <Button bsStyle="success"
                onClick={props.buttonClicked}>Unarchive Order
        </Button>
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

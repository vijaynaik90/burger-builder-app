import React from 'react';
import classes from './BuildControl.css';
import { Button } from 'react-bootstrap';
const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <Button
      bsStyle="danger"
      bsSize="large"
      onClick={props.removed}
      disabled={props.disabled }>Less</Button>
    <Button bsSize="large" bsStyle="success" onClick={props.added}>More</Button>
  </div>
);

export default buildControl;

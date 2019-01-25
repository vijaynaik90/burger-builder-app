import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';
// to check whether a link is active or not NavLink treats the url in to property as a prefix. hence exact is used. 
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}        
        activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;

import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder </NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders </NavigationItem> : null}
    {props.isAuthenticated ? <NavigationItem link="/archived-orders">Archived Orders </NavigationItem> : null}
    { props.isAuthenticated
      ? <NavigationItem link="/logout">Logout </NavigationItem>
        : <NavigationItem link="/auth">Sign In </NavigationItem>
    }
  </ul>
);

export default navigationItems;

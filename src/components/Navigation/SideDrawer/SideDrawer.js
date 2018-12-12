import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {
  //conditionally attach different css classes based on certain conditions

  let attachedClasses = [classes.SideDrawer,classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer,classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
          <nav>
            <NavigationItems/>
          </nav>
        </div>
      </div>
    </Aux>
  );
};

export default sideDrawer;

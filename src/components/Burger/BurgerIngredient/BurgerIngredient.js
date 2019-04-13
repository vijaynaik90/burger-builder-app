import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

//use curly braces for function since we want to write some logic before returning JSX
class BurgerIngredient extends Component {
  //different types of ingredient
  //render has to return JSX finally.
  render () {
    let ingredient = null;

    switch (this.props.name) {
      case ('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
        case ('bread-top'):
          ingredient =(
              <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
              </div>
          );
          break;
        case ('meat'):
          ingredient = <div className={classes.Meat}></div>;
          break;
        case ('cheese'):
          ingredient = <div className={classes.Cheese}></div>;
          break;
        case ('bacon'):
          ingredient = <div className={classes.Bacon}></div>;
          break;
        case ('salad'):
          ingredient = <div className={classes.Salad}></div>;
          break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired
};



export default BurgerIngredient;

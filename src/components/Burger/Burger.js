import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
// withRouter is a special hoc which gives access to match,location and history inside props object.
const burger = (props) => {
//Use BurgerIngredient to build Burger.
//below code transforms ingredient object into array of values of the ingredients
// eg: ingredient={salad:1,bacon:2,cheese:3}
// return [...Array(props.ingredients[ingredient])]===> this will transform the ingredient value into an array with as many elements as the value. eg: cheese:2 will be transformed into an array with 2 elements
// map(_,i) here _ means dont care about the array element itself. But index(i.e i) is important
  let transformedIngredients = Object.keys(props.ingredients)
                                        .map(ingredient =>{
                                          return [...Array(props.ingredients[ingredient])].map((_,i) => {
                                              return <BurgerIngredient key={ingredient + i} type={ingredient}/>;
                                          });
                                        }).reduce((arr,el) => {
                                          return arr.concat(el);
                                        },[]);//getting the keys from ingredients object in Burger.js. The above code creates correct
                                        // number of ingredients based on value in ingredients object.Eg: if cheese:2 then creates 2 cheese ingredients on UI
  if (transformedIngredients.length===0) {
    transformedIngredients = <p> Please start adding ingredients!!</p>
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default withRouter(burger);

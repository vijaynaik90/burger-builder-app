import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
//Use BurgerIngredient to build Burger.
//below code transforms ingredient object into array
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
console.log(transformedIngredients);
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
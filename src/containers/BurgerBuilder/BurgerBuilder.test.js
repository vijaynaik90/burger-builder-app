import { BurgerBuilder } from './BurgerBuilder';
import React from 'react';
import { configure, shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


// enzyme allows to render NavigationItems standalone independent of the react app for testing.

configure({adapter: new Adapter()});

describe ('<BurgerBuilder />', () => {
  let wrapper;
// need to set onInitIngredients prop before the BurgerBuilder is shallow mounted.
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  });
  it ('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad:0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});

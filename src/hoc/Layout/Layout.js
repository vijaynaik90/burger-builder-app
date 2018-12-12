import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false});
  }
  sideDrawerToggleHandler = () => {
    // doing this may lead to unexpected behaviour due to asynchronous nature of setState method.
    // this.setState({showSideDrawer: !this.state.showSideDrawer});

    // this is a cleaner way of setting the state when it depends on an old state.
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }
  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;

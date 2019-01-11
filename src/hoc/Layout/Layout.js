import React,{Component} from 'react';
import { connect } from 'react-redux';
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
  // Connecting Layout component to redux store since we need info whether user is logged in or not.
  // Login info can then be passed to NavigationItems component thru Toolbar where it is used.
  render () {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
};
export default connect(mapStateToProps) (Layout);

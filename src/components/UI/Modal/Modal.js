import React,{Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
  componentWillUpdate() {
    console.log('[Modal.js] Modal will update');
  }

  shouldComponentUpdate (nextProps,nextState) {
    //children of Modal can change. eg: whether to show Spinner or OrderSummary component?
    // Hence we need to check for =====> nextProps.children !== this.props.children
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  // Here if props.show is true then translateY(0) which is the postion thats there in css
  // if props.show is false then -100vh means viewport height so slide outside of screen
  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;

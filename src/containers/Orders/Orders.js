import React, { Component } from 'react';
import ButtonComponent from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import orderHOC from '../../hoc/Orders/orderHOC'

class Orders extends Component {

  state = {
    archiveButtonClicked : false,
    orderId: null
  }
  
  render () {
    return (
      <Aux>
        <Modal show={this.props.archiveButtonClicked} modalClosed={this.props.cancelArchiveHandler}>
          <p> Are you sure you want to archive order?</p>
          <ButtonComponent clicked={this.props.cancelArchiveHandler} btnType="Danger">NO</ButtonComponent>
          <ButtonComponent clicked={this.props.archiveOrderHandler} btnType="Success">YES</ButtonComponent>
        </Modal>
        {this.props.ordersJSX}        
      </Aux>
    );
  }
}

const WrappedComponent = orderHOC(Orders,false);

export default WrappedComponent;

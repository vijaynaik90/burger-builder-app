import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ButtonComponent from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {
  componentDidMount () {    
    this.props.onFetchOrders(this.props.token,this.props.userId,false);
  }
  
  componentWillReceiveProps(nextProps) {
    if( nextProps.archiveOrderSuccess !== this.props.archiveOrderSuccess) {
      // fetch updated orders after current order is archived.
      console.log ("Inside [Orders.js] componentWillReceiveProps");
      this.props.onFetchOrders(this.props.token,this.props.userId,false);
    }
  }

  state = {
    archiveButtonClicked : false,
    orderId: null
  }
  // Pass order.id into for archive operation.  
  archiveOrderHandler = () => {
    //archive selected order
    console.log("[Orders.js] Order id to archive:"+ this.state.orderId);
    if(this.state.orderId !== null){
      let putData = {
        isArchived: true
      };
      this.props.onArchiveOrder(this.props.token,this.state.orderId,putData);
      // closes the modal
      this.setState({archiveButtonClicked:false,orderId: null});
    }    
  };

  orderDetailsHandler = (id) => {
    //show select order details
    //TODO: make an axios request to fetch order or can pass order as an argument.
    this.props.history.push ({pathname: '/orders/' + id});
  }

  toggleArchiveClickedHandler = (id) => {
    this.setState({archiveButtonClicked: true,orderId: id});
  };

  cancelArchiveHandler = () => {
    this.setState({archiveButtonClicked:false,orderId: null});
  };

  viewArchivedOrders = () => {
    this.props.history.push ({ pathname: '/archived-orders' });
  };
  
  render () {
    console.log("[Orders.js] Rendering Orders.js");
    
    let orders = <Spinner />;    
    if (!this.props.loading) {
      orders = (
        <div style={{padding: '10px 60px'}}>
          {this.props.orders.map(order => {
          return <Order
                  ingredients={order.ingredients}
                  key={order.id}                
                  totalPrice={order.price}                    
                  archiveOrderClicked={() => this.toggleArchiveClickedHandler(order.id)}
                  showArchiveFlag={this.props.showArchivedOrders}
                  showOrderDetails = {() => this.orderDetailsHandler(order.id)}
                />;
          }
          )}
          <br />
          <Button onClick={this.viewArchivedOrders} bsSize="large" bsStyle="success"> View Archived Orders </Button>
        </div>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.archiveButtonClicked} modalClosed={this.cancelArchiveHandler}>
          <p> Are you sure you want to archive order?</p>
          <ButtonComponent clicked={this.cancelArchiveHandler} btnType="Danger">NO</ButtonComponent>
          <ButtonComponent clicked={this.archiveOrderHandler} btnType="Success">YES</ButtonComponent>
        </Modal>
        {orders}        
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
    return {
          orders: state.order.orders,
          loading: state.order.loading,
          archiveOrderSuccess: state.order.archiveUnarchiveSuccess,
          showArchivedOrders: state.order.showArchivedOrders,
          token: state.auth.token,
          userId: state.auth.userId          
    };
};

const mapDispatchToProps = dispatch => {
    return {
          onFetchOrders: (token,userId,fetchArchivedOrders) => dispatch(actions.fetchOrders(token,userId,fetchArchivedOrders)),
          onArchiveOrder: (token,orderId,orderData) => dispatch(actions.archiveOrder(token,orderId,orderData))
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));

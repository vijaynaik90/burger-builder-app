import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token,this.props.userId,false);
  }
  componentWillReceiveProps(nextProps) {
    if( nextProps.archiveOrderSuccess !== this.props.archiveOrderSuccess) {
      // fetch updated orders after current order is archived.
      console.log ("Inside [Orders.js] fetch updated orders");
      this.props.onFetchOrders(this.props.token,this.props.userId,false);
    }
  }

  // none , start, done
  state = {
    archiveButtonClicked : false
  }
  // Pass order.id into for archive operation.
  // TODO: redirect properly to /orders after archiving order.
  archiveOrderHandler = (id) => {
    //archive selected order
    let putData = {
      isArchived: true
    };
    this.props.onArchiveOrder(this.props.token,id,putData);
    // closes the modal
    this.setState({archiveButtonClicked:false});
  };

  toggleArchiveClickedHandler = () => {
    this.setState({archiveButtonClicked: true});
  };

  cancelArchiveHandler = () => {
    this.setState({archiveButtonClicked:false});
  };
  viewArchivedOrders = () => {
    this.props.history.push ({ pathname: '/archived-orders' });
  };
  // add a modal which says something like are you sure?
  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
          <Order
              ingredients={order.ingredients}
              totalPrice={order.price}
              key={order.id}
              archiveOrderClicked={this.toggleArchiveClickedHandler}
              archiveOrderCancelled={this.cancelArchiveHandler}
              archiveClickedStatus={this.state.archiveButtonClicked}
              arhiveOrderContinue={() => this.archiveOrderHandler(order.id)}
              showArchiveFlag={this.props.showArchivedOrders}
              />
          )
          )}
          <Button clicked={this.viewArchivedOrders} btnType="Success"> View Archived Orders </Button>
        </div>
      );
    }
    return orders;
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

import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orderHOC = (WrappedComponent, showArchivedComponent) => {
    class Orders extends Component {

        state = {
            archiveButtonClicked : false,
            unarchiveButtonClicked: false,
            orderId: null
          }

        componentDidMount() {
            this.props.onFetchOrders(this.props.userId,showArchivedComponent);
        }

        componentWillReceiveProps(nextProps) {
            if( nextProps.archiveUnarchiveSuccess !== this.props.archiveUnarchiveSuccess) {
              // fetch updated orders after current order is archived.
              console.log ("Inside [Orders.js] componentWillReceiveProps");
              this.props.onFetchOrders(this.props.userId,showArchivedComponent);
            }
          }
        
          orderDetailsHandler = (id) => {
            //show select order details
            //TODO: make an axios request to fetch order or can pass order as an argument.
            this.props.history.push ({pathname: '/orders/' + id});
          }


          archiveOrderHandler = () => {
            //archive selected order
            console.log("[Orders.js] Order id to archive:"+ this.state.orderId);
            if(this.state.orderId !== null){
              let putData = {
                archived: true,
                id: this.state.orderId
              };
              this.props.onModifyOrderState(this.state.orderId,putData,true);
              // closes the modal
              this.setState({archiveButtonClicked:false,orderId: null});
            }    
          };

          unarchiveOrderHandler = (orderId) => {
            //archive selected order
            let putData = {
            archived: false,
            id: orderId
            };
            this.props.onModifyOrderState(orderId,putData,false);
            this.setState({unarchiveButtonClicked: true});                
        };

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
            console.log("[Orders.js] Rendering Orders.js",showArchivedComponent);
            
            let viewArchivedOrders = !showArchivedComponent ? <Button onClick={this.viewArchivedOrders} bsSize="large" bsStyle="success"> View Archived Orders </Button> : null ;

            let orders = <Spinner />;    
            if (!this.props.loading) {
            orders = (
                <div style={{padding: '10px 60px'}}>
                {this.props.orders.map(order => {
                return <Order
                            ingredients={order.burger.ingredients}
                            key={order.id}                
                            totalPrice={order.burger.price}                    
                            buttonClicked = { !showArchivedComponent ? () => this.toggleArchiveClickedHandler(order.id) : () => this.unarchiveOrderHandler(order.id) }
                            displayArchiveOrders={showArchivedComponent}
                            showOrderDetails = {() => this.orderDetailsHandler(order.id)}
                        />;
                }
                )}
                <br />
                {viewArchivedOrders}
                 </div>
            );
            }

            let result = (
                <WrappedComponent
                    ordersJSX = {orders}
                    unarchiveButtonClicked = {this.state.unarchiveButtonClicked}
                    {...this.props}
                />
            );
            // if fetch unarchived orders
            if(!showArchivedComponent) {
               result = (
                <WrappedComponent
                    ordersJSX = {orders}
                    archiveButtonClicked = {this.state.archiveButtonClicked}
                    cancelArchiveHandler = {this.cancelArchiveHandler}
                    archiveOrderHandler = {this.archiveOrderHandler}
                    {...this.props}
                />
               );
            }
            return result;
        }
        
    }
    const mapStateToProps = (state) => {
        return {
            orders: state.order.orders,
            loading: state.order.loading,
            archiveUnarchiveSuccess: state.order.archiveUnarchiveSuccess,
            userId: state.auth.userId
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
            onFetchOrders: (userId,fetchArchivedOrders) => dispatch(actions.fetchOrders(userId,fetchArchivedOrders)),
            onModifyOrderState: (orderId,putData,flag) => dispatch(actions.modifyOrderState(orderId,putData,flag))
        };
    };
    
    return connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));
}

export default orderHOC;
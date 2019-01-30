import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './ArchivedOrders.css';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ArchivedOrders extends Component {

    state = {
        unarchiveButtonClicked: false
    };

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId,true);
    }

    componentWillReceiveProps(nextProps) {        
        if( nextProps.unArchiveOrderSuccess !== this.props.unArchiveOrderSuccess) {
          // fetch updated orders after current order is archived.
          console.log ("Inside [ArchiveOrders.js] fetch updated archived orders");
          this.props.onFetchOrders(this.props.token,this.props.userId,true);
        }
      }

    unarchiveOrderHandler = (id) => {
        //archive selected order
        let putData = {
          isArchived: false
        };
        this.props.onUnarchiveOrder(this.props.token,id,putData);
        // closes the modal
        this.setState({unarchiveButtonClicked: true});                
      };

    render() {
        let unarchiveSuccess = null;
        if(this.state.unarchiveButtonClicked) {
          unarchiveSuccess = (
            <div className={classes.UnarchiveSuccess}>
                <h4>Unarchive Order Success!!</h4>
                <p> You can view your unarchived orders <NavLink
                    to="/orders">
                    here</NavLink>
                </p>
            </div>
          );
        }
        let archivedOrders = <Spinner />;
        if(!this.props.loading){
            archivedOrders = (
                <div>
                    {unarchiveSuccess}
                    {this.props.orders.map(order => {
                        return <Order
                            ingredients={order.ingredients}
                            totalPrice={order.price}
                            key={order.id}
                            showArchiveFlag={this.props.showArchivedOrders}
                            unarchiveOrderClicked={() => this.unarchiveOrderHandler(order.id)}
                            />;
                        })
                    }
                </div>
            );
        }
        return archivedOrders;
    }
}

    const mapStateToProps = (state) => {
        return {
            orders: state.order.orders,
            loading: state.order.loading,
            unArchiveOrderSuccess: state.order.archiveUnarchiveSuccess,
            showArchivedOrders: state.order.showArchivedOrders,
            token: state.auth.token,
            userId: state.auth.userId
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
            onFetchOrders: (token,userId,fetchArchivedOrders) => dispatch(actions.fetchOrders(token,userId,fetchArchivedOrders)),
            onUnarchiveOrder: (token,orderId,putData) => dispatch(actions.unarchiveOrder(token,orderId,putData))
        };
    };



export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(ArchivedOrders,axios));
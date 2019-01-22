import React, {Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { stat } from 'fs';
class ArchivedOrders extends Component {

    state = {
        unarchiveButtonClicked: false
    };

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId,true);
    }

    unarchiveOrderHandler = (id) => {
        //archive selected order
        let putData = {
          isArchived: false
        };  
        this.props.onUnarchiveOrder(this.props.token,id,putData);
        // closes the modal
        this.setState({unarchiveButtonClicked: true});
        //fetches updated orders
        // TODO: fetch updated orders after current order is archived.
      };

    render() {
        let archivedOrders = <Spinner />;
        if(!this.props.loading){
            archivedOrders = (
                <div>
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
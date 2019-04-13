import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import OrderDetail from '../../../components/Order/OrderDetail/OrderDetail';
import { getHeaders } from '../../../shared/utility';

const items = [
    {label:'Burger Ingredients', type :'igs'},
    {label:'Shipping Details', type :'shipping'},
    {label:'Payment Information', type :'payment'},
    {label:'Order Preferences', type: 'prefs'}
  ];

class OrderDetails extends Component {
    state = {
        order: null
    }
    componentDidMount () {
        console.log(this.props);
        this.loadOrder();
    }

    // componentDidUpdate() {
    //     this.loadOrder();
    // }

    loadOrder() {
        if(this.props.match.params.id) {
            if( !this.state.order || (this.state.order && this.state.order.id !== +this.props.match.params.id)) {
                axios.defaults.headers = getHeaders();
                axios.get( '/v1/orders/' + this.props.match.params.id)
                .then( response => {
                    this.setState( { order: response.data } );
                } ).catch(err => {
                    console.log(err);
                }); 
            }
        }
    }

    redirectOrderHandler = () => {
        this.props.history.goBack();
    }
    render () {
        let orderDetails = <p style={{ textAlign: 'center' }}>Please select an Order!</p>;
        // if an order id has been passed to this component
        if(this.props.match.params.id) {
            orderDetails = <Spinner />
        }
        if(this.state.order) {
            orderDetails = (
                <div className="container">
                    <div className="col-xs-12">
                        <div className="text-center">                        
                            <h2>Invoice for purchase</h2>
                        </div>
                        <hr/>
                        <div className="row">
                            {items.map(item => {
                                return <OrderDetail 
                                            key={item.type}
                                            type={item.type}
                                            label={item.label}
                                            order={this.state.order}/>;
                            } 
                            )}
{/* 
                            <div className="col-xs-12 col-md-3 col-lg-3 pull-left">
                                <div className="panel panel-default" style={{ minHeight: 200}}>
                                    <div className="panel-heading">Ingredient Details</div>
                                        <div className="panel-body">
                                            <strong>David Peere:</strong><br/>
                                                1111 Army Navy Drive<br/>
                                                Arlington<br/>
                                                VA<br/>
                                            <strong>22 203</strong><br/>
                                        </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-3 col-lg-3">
                                <div className="panel panel-default" style={{ minHeight: 200}}>
                                    <div className="panel-heading">Payment Information</div>
                                    <div className="panel-body">
                                        <strong>Card Name:</strong> Visa<br/>
                                        <strong>Card Number:</strong> ***** 332<br/>
                                        <strong>Exp Date:</strong> 09/2020<br/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-3 col-lg-3">
                                <div className="panel panel-default" style={{ minHeight: 200}}>
                                    <div className="panel-heading">Shipping Address</div>                                    
                                    <div className="panel-body">
                                        <strong>Name:</strong> {this.state.order.orderData.name}<br/>
                                        {this.state.order.orderData.street}<br/>
                                        {this.state.order.orderData.country}<br/>
                                        {this.state.order.orderData.zipCode}<br/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-3 col-lg-3">
                                <div className="panel panel-default" style={{ minHeight: 200}}>
                                    <div className="panel-heading">Order Preferences</div>
                                    <div className="panel-body">
                                        <strong>Delivery Method:</strong> {this.state.order.orderData.deliveryMethod}<br/>
                                    </div>
                                </div>
                            </div> */}


                        </div>
                        <Button bsStyle="success" onClick={this.redirectOrderHandler}> Go back to Orders Page</Button>
                    </div>
                </div>
            );
        }
        return orderDetails;

    };
}

const mapStateToProps = (state) => {
    return {        
        userId: state.auth.userId
    };
};


export default connect(mapStateToProps,null) (withErrorHandler(OrderDetails,axios));
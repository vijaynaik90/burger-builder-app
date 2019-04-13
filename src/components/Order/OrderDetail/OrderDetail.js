import React from 'react';

const orderDetail = (props) => {

    let panelDetails = null;

    let ingredients = props.order.burger.ingredients;

  
    switch (props.type) {
        case ('igs'):
            panelDetails = ingredients.map(ig => {
                return (<p key={ig.name}>
                            <strong
                                style={{textTransform: 'capitalize'}}>{ig.name}:</strong> {ig.quantity}
                        </p>);
              });
            break;
        case ('shipping'):
            panelDetails = (
                <p>                
                    <strong>Name:</strong> {props.order.order_data.name}<br/>
                    <strong>Address:</strong> <br />
                        {props.order.order_data.street}<br/>
                        {props.order.order_data.country}<br/>
                        {props.order.order_data.zip_code}<br/>
                    <strong>Email: </strong> {props.order.order_data.email}
                </p>
            );
            break;
        case ('payment'):
            break;
        case ('prefs'):
            panelDetails = (
                <p>
                    <strong>Delivery Method:</strong> {props.order.order_data.delivery_method}<br/>
                </p>
            );
            break;
        default:
            panelDetails = null;
    }
    return (
        <div className="col-xs-12 col-md-3 col-lg-3">
            <div className="panel panel-default" style={{ minHeight: '200px' }}>
                <div className="panel-heading">{props.label}</div>
                <div className="panel-body">
                    {panelDetails}
                </div>
            </div>
        </div>
    );

}

export default orderDetail;
import React from 'react';

const orderDetail = (props) => {

    let panelDetails = null;

    const ingredients = [];

  for (let ingredient in props.order.ingredients) {
    ingredients.push({
        name: ingredient,
        quantity: props.order.ingredients[ingredient]
      });
  }
    switch (props.type) {
        case ('igs'):
            panelDetails = ingredients.map(ig => {
                return (<p>
                            <strong
                                key={ig.name}
                                style={{textTransform: 'capitalize'}}>{ig.name}:</strong> {ig.quantity}
                        </p>);
              });
            break;
        case ('shipping'):
            panelDetails = (
                <p>                
                    <strong>Name:</strong> {props.order.orderData.name}<br/>
                    {props.order.orderData.street}<br/>
                    {props.order.orderData.country}<br/>
                    {props.order.orderData.zipCode}<br/>
                </p>
            );
            break;
        case ('payment'):
            break;
        case ('prefs'):
            panelDetails = (
                <p>
                    <strong>Delivery Method:</strong> {props.order.orderData.deliveryMethod}<br/>
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
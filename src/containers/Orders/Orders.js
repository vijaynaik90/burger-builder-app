import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {

  state = {
    orders: [],
    loading:true
  }
  componentDidMount () {
    axios.get('/orders.json')
        .then(res => {
          const retrievedOrders = [];
          for (let key in res.data) {
            retrievedOrders.push({
              ...res.data[key],
              id : key
            });
          }
          this.setState({orders:retrievedOrders,loading:false});
        }).catch(err => {
          this.setState({loading:false});
        })
  }
  render () {

    return (
      <div>
        {this.state.orders.map(order => (
        <Order
          ingredients={order.ingredients}
          totalPrice={order.price}
          key={order.id} />
        )
        )}
      </div>
    );
  }
}

export default withErrorHandler(Orders,axios);

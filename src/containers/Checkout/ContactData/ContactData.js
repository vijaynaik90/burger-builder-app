import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import axios from '../../../axios-orders.js';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: ''
    },loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();//prevents reloading of page.
    this.setState({loading:true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer : {
        name:'Vijay Naik',
        address: {
          street:'1111 Main Street',
          zipCode: '122121',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json',order)
          .then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
            // history is accessible here since its poassed from Checkout component
          })
          .catch(error => {
            this.setState({loading:false});
          });
    console.log(this.props.ingredients);
  }

  render () {
    let form = <form>
        <input className={classes.Input} type ="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type ="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type ="text" name="street" placeholder="Street Name" />
        <input className={classes.Input} type ="text" name="zip" placeholder="Zip Code" />
        <Button
          btnType="Success"
          clicked={this.orderHandler}> ORDER </Button>
    </form>;
    if(this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

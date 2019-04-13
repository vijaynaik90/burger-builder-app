import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './ArchivedOrders.css';
import orderHOC from '../../../hoc/Orders/orderHOC';
class ArchivedOrders extends Component {

    state = {
        unarchiveButtonClicked: false
    };


    render() {
        let unarchiveSuccess = null;
        if(this.props.unarchiveButtonClicked) {
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
        return (
            <div>
                {unarchiveSuccess}
                {this.props.ordersJSX}
            </div>
        );
    }
}

const WrappedComponent = orderHOC(ArchivedOrders,true);

export default WrappedComponent;
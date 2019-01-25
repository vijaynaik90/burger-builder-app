import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent,axios) => {
  //create a reusable hoc which you can then wrap around multiple components.
  return class extends Component {
    state = {
      error: null
    };

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }
    //using componentWillMount here because it will be called before render(). So, we can catch the error thrown by axios.get in BurgerBuilder class
    componentWillMount () {
      //global interceptors to handle errors
      // clear any errors. so that whenever we send any requests then error is null
      // also need to always return the request else will block the request.
      console.log('[withErrorHandler]Component WILL mount');
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }
    componentWillUnmount () {
      //removing reference to interceptors created during componentWillMount. Else, it might leak memory as there will be axios interceptors which arent really used anymore.
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message: null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}


export default withErrorHandler;

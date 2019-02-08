import React, { Component } from 'react';
import carousel1 from '../../assets/images/carousel1.jpg';
import carousel2 from '../../assets/images/carousel2.jpg';
import { Carousel,Button } from 'react-bootstrap';
import classes from './Home.css';

class Home extends Component {
    state = {
        index: 0,
        direction: null
    }
   handleSelect = (selectedIndex, e) => {
    this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
   }

    render() {
        const { index, direction } = this.state;

        return (
         <div className="container">
            <div className="row">
            {/* TODO: Change Carousel to separate functional component */}
                <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}
                    fade="true">
                    <Carousel.Item>
                        <img
                            className={classes.bg}
                            src={carousel1}
                            alt="First slide"
                        />
                        <div className={classes.HeaderText}>
                            <div className="col-md-12 text-center">
                                <h2>
                                    <span>Welcome to <strong>LOREM IPSUM</strong></span>
                                </h2>
                                <br/>
                                <h3>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </h3>
                                <br />
                                <div>
                                    <Button bsSize="large" bsStyle="primary">
                                        Order Now!!
                                    </Button>
                                    {/* <a className="btn btn-theme btn-sm btn-min-block" href="#">Login</a><a className="btn btn-theme btn-sm btn-min-block" href="#">Register</a></div> */}
                                </div>
                            </div>
                        </div>                            
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className={classes.bg}
                            src={carousel2}
                            alt="Second slide"                        
                        />
                         <div className={classes.HeaderText}>
                            <div className="col-md-12 text-center">
                                <h2>
                                    <span>Welcome to <strong>LOREM IPSUM</strong></span>
                                </h2>
                                <br/>
                                <h3>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </h3>
                                <br />
                                <div>
                                    <Button bsSize="large" bsStyle="primary">
                                        Order Now!!
                                    </Button>
                                    {/* <a className="btn btn-theme btn-sm btn-min-block" href="#">Login</a><a className="btn btn-theme btn-sm btn-min-block" href="#">Register</a></div> */}
                                </div>
                            </div>
                        </div>         
                    </Carousel.Item>
                </Carousel>

        </div>
      </div>  
        );
    }
}

export default Home;
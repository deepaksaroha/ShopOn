import axios from 'axios';
import React from 'react';
import Navbar from '../components/Navbar'

class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            orderData: {}
        }
    }

    componentDidMount(){
        Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions'), axios.get('/api/orders/'+this.props.match.params.orderId)])
        .then(responses=>{
            this.setState({
                cartCount: responses[0].data.cart.length,
                isLoggedIn: responses[1].data.loginStatus,
                orderData: responses[2].data.orderData,
                isLoaded: true
            })
        })
        .catch(error=>{
            console.log('something went wrong')
        })
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            this.props.history.push('/home');
        })
        .catch(error=>{
            console.log('something went wrong!');
        })
    }


    render(){

        if(this.state.isLoaded){        
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
                    <div style={{margin: '20px'}}>
                        <h3>Order Details</h3>
                        <h4>Products</h4>
                        <table style={{textAlign: 'left'}}>
                            <thead>
                                <tr style={{height: 'unset'}}>
                                    <th style={{border: '1px solid black'}}>Name</th>
                                    <th style={{border: '1px solid black'}}>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.orderData.products.map(product => {
                                    return <tr style={{height: 'unset'}} key={product.productId}>
                                        <td style={{border: '1px solid black'}}>{product.name}</td>
                                        <td style={{border: '1px solid black'}}>{product.quantity}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                        <p>Total: {this.state.orderData.total/100}</p>
                    </div>
                </React.Fragment>
            )
        }else{
            return null;
        }
    }
}

export default Order;
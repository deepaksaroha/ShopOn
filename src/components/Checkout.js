import React from 'react'
import axios from 'axios'
import Checkoutitem from './Checkoutitem';
import Navbar from './Navbar'
import paymentHandlers from './paymentHandlers';
import onOrderCreateFailure from './OrderCreateFailure'
import { initiatePayment } from './Payment'

class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            cart : []
        }
    }

    getCart=()=>{
        axios.get('/api/users/cart')
        .then(response=>{
            this.setState({
                cart: response.data.cart,
                cartCount: response.data.cart.length
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
        })
    }
    
    getLoginStatus=()=>{
        axios.get('/api/sessions')
        .then(response=>{
            this.setState({
                isLoggedIn: true,
                isLoaded: true
            })
        })
        .catch(_=>{
            this.setState({
                isLoggedIn: false,
                isLoaded: true
            })
        })
    }

    componentDidMount(){
        this.getCart();
        this.getLoginStatus();
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            this.getCart();
            this.getLoginStatus();
        })
        .catch(_=>{
            this.getCart();
            this.getLoginStatus();
        })
    }

    toLogin=()=>{
        this.props.history.push('/login');
    }

    handleBuy=()=>{
        initiatePayment(paymentHandlers, onOrderCreateFailure);
    }

    render(){
        let totalAmount = 0;
        this.state.cart.forEach(item=>{
            totalAmount += item.quantity*item.price
        })

        if(this.state.isLoaded){
            if(!this.state.isLoggedIn){
                this.toLogin();
            }
    
    
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} />
                    {
                        this.state.cart.length>0?
                        <div>
                            <div>
                                {
                                    this.state.cart.map(cartItem=>{
                                        return <Checkoutitem item={cartItem} />
                                    })
                                }
                            </div>
                            <div>
                                <p>Cart Value: Rs {totalAmount}</p>
                                <p>Delivery Charge: Rs 50</p>
                                <p>Total Amount: Rs {totalAmount+50}</p>
                            </div>
                            <button onClick={this.handleBuy}>Buy</button>
                        </div>
                        :
                        <p>Your Cart is Empty</p>
                    }
                    
                </React.Fragment>
            )
        }
        else{
            return ''
        }
    }
}

export default Checkout;
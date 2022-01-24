import React from 'react'
import axios from 'axios'
import Checkoutitem from './Checkoutitem';
import Navbar from './Navbar'
import paymentHandlers from './paymentHandlers';
import onOrderCreateFailure from './OrderCreateFailure'
import { initiatePayment } from './Payment'
import '../css/Checkout.css'

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
        .catch(()=>{
            console.log('please refresh')
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
                        <div className="checkout-main-outerbox">
                            <div>
                                <table>
                                    <tbody>
                                        {
                                            this.state.cart.map(cartItem=>{
                                                return <tr key={cartItem._id}><Checkoutitem item={cartItem} /></tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="checkout-box">
                                <div>
                                    <p>Cart Value: &#x20b9; {totalAmount}</p>
                                    <p>Delivery Charge: &#x20b9; {totalAmount>=500 ? 0: 50}</p>
                                    <hr/>
                                    <p>Total: Rs {totalAmount+(totalAmount>=500 ? 0: 50)}</p>
                                    <button id="chkout-buy-btn" onClick={this.handleBuy}>Place Order</button>
                                </div>
                            </div>
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
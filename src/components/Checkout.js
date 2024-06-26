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

    componentDidUpdate () {
        console.log("dsadsadsa");
        if(window.IntersectionObserver){
            const images = document.querySelectorAll(".gen-img");
            console.log(images);
    
            const intersectionObserver = new IntersectionObserver(
                (entries)=>{
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            const image = entry.target;
                            if(!image.src){
                                image.src = image.dataset.src;
                            }
                            intersectionObserver.unobserve(image);
                        }
                    })
                },
                {
                    rootMargin: "10px",
                    threshold: 0
                }
            )

            images.forEach(image => {
                intersectionObserver.observe(image);
            })

        }
    }

    componentDidMount(){
        Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions')])
        .then(responses=>{

            if(responses[1].data.loginStatus === false){
                this.props.history.push('/login');
            }else{
                this.setState({
                    cart: responses[0].data.cart,
                    cartCount: responses[0].data.cart.length,
                    isLoggedIn: responses[1].data.loginStatus,
                    isLoaded: true
                })
            }
        })
        .catch(error=>{
            console.log('something went wrong')
        })
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions')])
            .then(responses=>{
                this.setState({
                    cart: responses[0].data.cart,
                    cartCount: responses[0].data.cart.length,
                    isLoggedIn: responses[1].data.loginStatus,
                    isLoaded: true
                })
            })
            .catch(error=>{
                console.log('something went wrong')
            })
        })
        .catch(()=>{
            console.log('please refresh')
        })
    }

    handleBuy=()=>{
        initiatePayment(paymentHandlers, onOrderCreateFailure);
    }

    render(){
        let totalAmount = 0;
        this.state.cart.forEach(item=>{
            totalAmount += item.quantity*item.price;
        })

        if(this.state.isLoaded){
    
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
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
                                    <p>Total: &#x20b9; {totalAmount+(totalAmount>=500 ? 0: 50)}</p>
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
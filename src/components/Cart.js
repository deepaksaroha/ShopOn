import axios from 'axios';
import React from 'react';
import CartItem  from './Cartitem';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import '../css/Cart.css'

class Cart extends React.Component{
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

    handleChangeItem=()=>{
        this.getCart();
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


    render(){

        if(this.state.isLoaded){
            let amount = 0;
            this.state.cart.forEach(cartItem=>{
                amount += cartItem.quantity*cartItem.price;
            })
        
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} />
                    {
                        this.state.cartCount>0?
                        <div>
                            <div className="cart-otr-bx">
                                <table><tbody>
                                {
                                    this.state.cart.map(cartItem=>{
                                        return <tr className="crt-row" key={cartItem.productId}>
                                            <CartItem item={cartItem} key={cartItem.productId} handleChangeItem={this.handleChangeItem}/>
                                        </tr>
                                    })
                                }
                                </tbody></table>
                            </div>
                            <div id="proceed-box">
                                <p>Cart Value: Rs {amount}</p>
                                <button id="chkout-btn"><Link to="/checkout">Proceed to Checkout</Link></button>
                            </div>
                        </div>
                        :
                        <p>Your Cart is Empty</p>
                    }

                </React.Fragment>
            )
        }else{
            return null
        }

        
    }
}

export default Cart;
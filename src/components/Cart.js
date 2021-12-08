import axios from 'axios';
import React from 'react';
import CartItem  from './Cartitem';
import Navbar from '../components/Navbar'

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart : [],
            isLoggedin : false,
            cartCount: 0
        }
    }

    getCart(){
        axios.get('https://localhost:4000/users/cart')
        .then(response=>{
            this.setState({
                cart: response.cart
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
        })
    }

    componentDidMount(){
        this.getCart();
    }

    handleCheckoutClick(){
        this.props.history.push('/checkout')
    }

    getCartCount(){
        axios.get('https://localhost:4000/api/users/cart')
        .then(response=>{
            if(response.cart.length !== this.state.cartCount){
                this.setState({
                    cartCount: response.cart.length
                })
            }
        })
        .then(error=>{
        })
    }

    getLoginStatus(){
        axios.get('https://localhost:4000/api/sessions')
        .then(response=>{
            if(this.state.isLoggedin !== true){
                this.setState({
                    isLoggedin: true
                })
            }
        })
        .then(error=>{
            if(this.state.isLoggedin !== false){
                this.setState({
                    isLoggedin: false
                })
            }
        })
    }

    handleDelete(){
        this.getCart();
    }

    render(){
        
        this.getCartCount();
        this.getLoginStatus();

        let amount = 0;
        this.state.cart.forEach(cartItem=>{
            amount += cartItem.quantity*cartItem.price;
        })


        return(
            <React.Fragment>
                <Navbar cartCount={this.state.cartCount} loginStatus={this.state.isLoggedin}/>
                <div>
                    {
                        this.state.cart.map(cartItem=>{
                            return <CartItem item={cartItem} handleChangeItem={this.handleChangeItem} />
                        })
                    }
                </div>
                <div>
                    <p>Cart Value: Rs {amount}</p>
                </div>
                <button onClick={this.handleCheckoutClick}>Proceed to Checkout</button>
            </React.Fragment>
        )
    }
}

export default Cart;
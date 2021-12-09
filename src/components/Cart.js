import axios from 'axios';
import React from 'react';
import CartItem  from './Cartitem';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart : [],
            cartCount: 0,
            isLoggedin : false
        }
    }

    getCart(){
        axios.get('https://localhost:4000/api/users/cart')
        .then(response=>response.json())
        .then(response=>{
            this.setState({
                cart: response.cart,
                cartCount: response.cart.length
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
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

    componentDidMount(){
        this.getCart();
        this.getLoginStatus();
    }

    handleChangeItem(){
        this.getCart();
    }

    render(){

        let amount = 0;
        this.state.cart.forEach(cartItem=>{
            amount += cartItem.quantity*cartItem.price;
        })


        return(
            <React.Fragment>
                <Navbar cartCount={this.state.cartCount}/>
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
                <button><Link to="/checkout">Proceed to Checkout</Link></button>
            </React.Fragment>
        )
    }
}

export default Cart;
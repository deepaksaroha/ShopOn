import React from 'react'
import axios from 'axios'
import Checkoutitem from './Checkoutitem';
import Navbar from '../components/Navbar'

class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart : []
        }
    }

    componentDidMount(){
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

    render(){

        let amount = 0;
        this.state.cart.forEach(cartItem=>{
            amount += cartItem.quantity*cartItem.price;
        })


        return(
            <React.Fragment>
                <Navbar />
                <div>
                    {
                        this.state.cart.map(cartItem=>{
                            return <Checkoutitem item={cartItem} />
                        })
                    }
                </div>
                <div>
                    <p>Cart Value: Rs {amount}</p>
                    <p>Delivery Charge: Rs 50</p>
                    <p>Total Amount: Rs {amount+50}</p>
                </div>
                <button><a href="#">Pay</a></button>
            </React.Fragment>
        )
    }
}

export default Checkout;
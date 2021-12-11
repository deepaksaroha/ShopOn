import React from 'react'
import axios from 'axios'
import Checkoutitem from './Checkoutitem';
import Navbar from '../components/Navbar'

class Checkout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart : [],
            loginStatus: false
        }
    }

    componentDidMount(){
        axios.get('https://localhost:4000/api/sessions')
        .then(response=>{
            this.setState({
                loginStatus: true
            })
        })


        axios.get('https://localhost:4000/api/users/cart')
        .then(response=>{
            this.setState({
                cart: response.cart
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
        })
    }

    toLogin(){
        this.props.history.push('/login');
    }

    handleBuy(){
        
    }

    render(){
        if(!this.state.login){
            this.toLogin();
        }

        let amount = 0;
        this.state.cart.forEach(cartItem=>{
            amount += cartItem.quantity*cartItem.price;
        })


        return(
            <React.Fragment>
                <Navbar />
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
                            <p>Cart Value: Rs {amount}</p>
                            <p>Delivery Charge: Rs 50</p>
                            <p>Total Amount: Rs {amount+50}</p>
                        </div>
                        <button onClick={this.handleBuy}>Buy</button>
                    </div>
                    :
                    <p>Your Cart is Empty</p>
                }
                
            </React.Fragment>
        )
    }
}

export default Checkout;
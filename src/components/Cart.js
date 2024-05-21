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

    // componentDidUpdate() {
    //     if(window.IntersectionObserver){
    //         const images = document.querySelectorAll(".gen-img");
    //         console.log(images);
    
    //         const intersectionObserver = new IntersectionObserver(
    //             (entries)=>{
    //                 entries.forEach((entry) => {
    //                     if(entry.isIntersecting){
    //                         const image = entry.target;
    //                         if(!image.src){
    //                             image.src = image.dataset.src;
    //                         }
    //                         intersectionObserver.unobserve(image);
    //                     }
    //                 })
    //             },
    //             {
    //                 rootMargin: "10px",
    //                 threshold: 0
    //             }
    //         )

    //         images.forEach(image => {
    //             intersectionObserver.observe(image);
    //         })

    //     }
    // }

    componentDidMount(){
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
    }

    handleChangeItem=()=>{
        console.log('2')
        axios.get('/api/users/cart')
        .then(response=>{
            console.log('3')
            this.setState({
                cart: response.data.cart,
                cartCount: response.data.cart.length
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
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
        .catch(error=>{
            console.log('something went wrong')
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
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
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
                                <Link to="/checkout"><button id="chkout-btn">Proceed to Checkout</button></Link>
                            </div>
                        </div>
                        :
                        <div style={{textAlign: 'center', }}>
                            <p>Your Cart is Empty</p>
                            <button style={{color: 'greenyellow', border: '1px solid greenyellow', fontSize: '36px', borderRadius: '10px', background: 'none'}}><Link to="/home">Let's ShopOn</Link></button>
                        </div>
                    }

                </React.Fragment>
            )
        }else{
            return null
        }

        
    }
}

export default Cart;
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

class ProductDescription extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            productData: {},
            cart: [],
            quantity: 1
        }
    }

    getProductData(){
        axios.get('/api/products/'+this.props.match.params.productId)
        .then(response=>{
            this.setState({
                productData: response.data.productData
            })
        })
        .catch(error=>{
            console.log('Something went wrong')
        })
    }

    getCartData=()=>{
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
        this.getProductData();
        this.getCartData();
        this.getLoginStatus();
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            this.getCartData();
            this.getLoginStatus();
        })
        .catch(_=>{
            this.getCartData();
            this.getLoginStatus();
        })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleAddToCart=()=>{
        axios.put('/api/users/cart',
            {
                productId: this.state.productData.productId,
                name: this.state.productData.name,
                quantity: this.state.quantity,
                price: this.state.productData.price
            }
        )
        .then(response=>{
            this.getCartData();
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    handleBuy=()=>{
        axios.put('/api/users/cart',
            {
                productId: this.state.productData.productId,
                name: this.state.productData.name,
                quantity: this.state.quantity,
                price: this.state.productData.price
            }
        )
        .then(response=>{
            this.props.history.push('/cart');
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    render(){

        const cartProductIds = this.state.cart.map(product=>product.productId)
        const productData = this.state.productData;
        if(this.state.isLoaded){
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount}/>
                    <img src="" alt="" />
                    <p>{productData.name}</p>
                    <p>{productData.price}</p>
                    <label>Units:</label>
                    <select name="quantity" onChange={this.handleChange} value={this.state.quantity}>
                        <option htmlFor="quantity" value="1" defaultValue>1</option>
                        <option htmlFor="quantity" value="2">2</option>
                        <option htmlFor="quantity" value="3">3</option>
                        <option htmlFor="quantity" value="4">4</option>
                        <option htmlFor="quantity" value="5">5</option>
                    </select>
                    {
                        cartProductIds.includes(productData.productId) ?
                        <button><Link to="/cart">Add to Cart</Link></button>
                        :
                        <button onClick={this.handleAddToCart}>Add to Cart</button>
                    }
                    {
                        cartProductIds.includes(productData.productId) ?
                        <button><Link to="/cart">Buy Now</Link></button>
                        :
                        <button onClick={this.handleBuy}>Buy Now</button>
                    }
                </React.Fragment>
            )
        }else{
            return ''
        }        
    }
}

export default ProductDescription;
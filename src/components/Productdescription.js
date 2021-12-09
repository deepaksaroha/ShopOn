import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

class ProductDescription extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productData: {},
            cart: [],
            quantity: 0
        }
    }

    getProductData(){
        axios.get('https://localhot:4000/api/products/'+this.props.match.params.productId)
        .then(response=>response.json())
        .then(response=>{
            this.setState({
                productData: response.productData
            })
        })
    }

    getCartData(){
        axios.get('https://localhost:4000/api/users/cart')
        .then(response=>{
            this.setState({
                cart: response.cart
            })
        })
    }

    componentDidMount(){
        this.getProductData();
        this.getCartData();
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleAddToCart(){
        axios.put('https://localhot:4000/api/users/cart',
            {
                data: {
                    productId: this.state.productData.productId,
                    name: this.state.productData.name,
                    quantity: this.state.quantity,
                    price: this.state.productData.price
                }
            }
        )
        .then(response=>{
            this.props.handleAddProduct();
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    handleBuy(){
        axios.put('https://localhot:4000/api/users/cart',
            {
                data: {
                    productId: this.state.productData.productId,
                    name: this.state.productData.name,
                    quantity: this.state.quantity,
                    price: this.state.productData.price
                }
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

        return(
            <React.Fragment>
                <Navbar cartCount={this.state.cartCount} />
                <img src="" alt="" />
                <p>{productData.name}</p>
                <p>{productData.price}</p>
                <label>Units:</label>
                <select name="quantity" onChange={this.handleChange} value={this.state.quantity}>
                    <option for="quantity" value="1">1</option>
                    <option for="quantity" value="2">2</option>
                    <option for="quantity" value="3">3</option>
                    <option for="quantity" value="4">4</option>
                    <option for="quantity" value="5">5</option>
                </select>
                {
                    productData.productId in cartProductIds?
                    <button><Link to="/cart">Add to Cart</Link></button>
                    :
                    <button onClick={this.handleAddToCart}>Add to Cart</button>
                }
                {
                    productData.productId in cartProductIds?
                    <button><Link to="/cart">Buy Now</Link></button>
                    :
                    <button onClick={this.handleBuy}>Buy Now</button>
                }
            </React.Fragment>
        )
    }
}

export default ProductDescription;
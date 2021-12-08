import React from 'react'
import axios from 'axios'
import ProductCard from './Productcard'
import Navbar from './Navbar';

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            cart: [],
            isLoggedin: false
        }
    }

    getProductsData(){
        let URLString = 'https://localhost:4000/api/products?'

        if(this.props.location.state.searchWord !== undefined){
            URLString += 'searchWord='+this.props.location.state.searchWord;
        }else if(this.props.location.state.category !== undefined){
            URLString += 'category='+this.props.location.state.category;
        }
       
        axios.get(URLString)
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            this.setState({
                products: response.products
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
        this.getProductsData();
        this.getCartData();
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

    render(){
        this.getLoginStatus();
        const cartProductIds = this.state.cart.map(product=>product.productId)

        return(
            <React.Fragment>
                <Navbar cartCount={this.state.cart.length} loginStatus={this.state.isLoggedin}/>
                {
                    this.state.products.map(product=>{
                        return <div>
                            <ProductCard productData={product} handleAddProduct={this.handleAddProduct}/>
                            {product.productId in cartProductIds? <p>Item in cart</p>:''}
                        </div>
                    })
                }
            </React.Fragment>
        )
    }

}

export default Products;
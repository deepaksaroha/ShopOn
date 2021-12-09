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

        if(this.props.match.params.searchText !== undefined){
            URLString += 'searchWord='+this.props.location.state.searchText;
        }else if(this.props.match.params.category !== undefined){
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

    handleAddProduct(){
        this.getCartData();
    }

    render(){
        const cartProductIds = this.state.cart.map(product=>product.productId)

        return(
            <React.Fragment>
                <Navbar cartCount={this.state.cart.length}/>
                {
                    this.state.products.map(product=>{
                        return <div>
                            <ProductCard {...product} inCart={product.productId in cartProductIds} handleAddProduct={this.handleAddProduct}/>
                        </div>
                    })
                }
            </React.Fragment>
        )
    }

}

export default Products;
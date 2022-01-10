import React from 'react'
import axios from 'axios'
import ProductCard from './Productcard'
import Navbar from './Navbar';
import Sort from './Sort';
import sort from './SortFunction';

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            products: [],
            cart: [],
            sortOrder: null
        }
    }

    getProductsData=()=>{
        let URLString = '/api/products?'
        
        if(this.props.match.params.searchText !== undefined){
            URLString += 'searchWord='+this.props.match.params.searchText;
        }else if(this.props.match.params.category !== undefined){
            URLString += 'category='+this.props.match.params.category;
        }
       
        axios.get(URLString)
        .then(response=>{
            this.setState({
                products: response.data.products
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

    componentDidMount(){
        this.getProductsData();
        this.getCartData();
        this.getLoginStatus();
    }

    componentDidUpdate(prevPros, prevState){
        if(prevPros === undefined){
            return false;
        }
        if(prevPros.match.params.searchText !== this.props.match.params.searchText){
            this.getProductsData();
        }
    }

    handleAddProduct=()=>{
        this.getCartData();
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

    handleChangeItem=()=>{
        this.getCartData();
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

    handleBuy=()=>{
        this.props.history.push('/cart');
    }

    handleChangeSort=(sortOrder)=>{
        this.setState({
            sortOrder: sortOrder
        })
    }

    render(){
        const cartProductIds = this.state.cart.map(product=>product.productId)
        
        const products = sort(this.state.products, this.state.sortOrder);

        return(
            <React.Fragment>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount}/>
                <Sort handleChangeSort={this.handleChangeSort} />
                {
                    products.map(product=>{
                        let inCart = false;
                        cartProductIds.forEach(id=>{
                            if(id === product.productId){
                                inCart = true
                            }
                        })
                        return <div key={product.productId}>
                            <ProductCard {...product} inCart={inCart} handleAddProduct={this.handleAddProduct} handleBuy={this.handleBuy} />
                        </div>
                    })
                }
            </React.Fragment>
        )
    }

}

export default Products;
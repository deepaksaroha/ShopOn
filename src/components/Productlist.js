import React from 'react'
import axios from 'axios'
import ProductCard from './Productcard'
import Navbar from './Navbar';
import Sort from './Sort';
import sort from './SortFunction';
import Categories from './Categories';
import '../css/ProductList.css';

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
        let URLString = '/api/products'
        if(this.props.location.search !== undefined){
            URLString += this.props.location.search;
        }
        if(this.props.match.params.category !== undefined){
            URLString += '?category='+this.props.match.params.category;
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
        if(prevPros.location.search !== this.props.location.search 
            || prevPros.match.params.category !== this.props.match.params.category){
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
        .catch(()=>{
            console.log('something went wrong')
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

        if(!this.state.isLoaded){
            return null;
        }else{
        return(
            <React.Fragment>
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount}/>
                <Categories />
                <div className="plp-main">
                    <div className="sortfilter-outer-box">
                        <Sort handleChangeSort={this.handleChangeSort} />
                    </div>
                    <div className="list-outer-box">
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
                    </div>
                </div>
            </React.Fragment>
        )
        }
    }

}

export default Products;
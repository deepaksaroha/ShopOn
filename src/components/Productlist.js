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
        let URLString = '/api/products'
        if(this.props.location.search !== undefined){
            URLString += this.props.location.search;
        }
        if(this.props.match.params.category !== undefined){
            URLString += '?category='+this.props.match.params.category;
        }

        Promise.all([axios.get(URLString), axios.get('/api/users/cart'), axios.get('/api/sessions')])
        .then(responses=>{
            this.setState({
                products: responses[0].data.products,
                cart: responses[1].data.cart,
                cartCount: responses[1].data.cart.length,
                isLoggedIn: responses[2].data.loginStatus,
                isLoaded: true
            })
        })
        .catch(error=>{
            console.log('some error occured');
        })
    }

    componentDidUpdate(prevPros, prevState){
        console.log("dfsadas")
        if(window.IntersectionObserver){
            const images = document.querySelectorAll(".gen-img");
            console.log(images);
    
            const intersectionObserver = new IntersectionObserver(
                (entries)=>{
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            const image = entry.target;
                            if(!image.src){
                                image.src = image.dataset.src;
                            }
                            intersectionObserver.unobserve(image);
                        }
                    })
                },
                {
                    rootMargin: "10px",
                    threshold: 0
                }
            )

            images.forEach(image => {
                intersectionObserver.observe(image);
            })

        }
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

    handleChangeItem=()=>{
        this.getCartData();
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
                <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
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
                                return <div className="card-box" key={product.productId}>
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
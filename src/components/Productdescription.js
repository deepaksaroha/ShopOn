import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import '../css/ProductDescription.css'

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

    componentDidMount(){
        Promise.all([axios.get('/api/products/'+this.props.match.params.productId),
        axios.get('/api/users/cart'), axios.get('/api/sessions')])
        .then(responses=>{
            this.setState({
                productData: responses[0].data.productData,
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
            return axios.get('/api/users/cart')
        })
        .then(response=>{
            this.setState({
                cart: response.data.cart,
                cartCount: response.data.cart.length
            })
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
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
                    <div className="pro-desc-outer-box">
                        <div className="pro-desc-img-box">
                            <div className="pro-desc-disp-img1">
                                <div id="pro-desc-disp-img"><img className="all-imgs" src={`${productData.images[0]}.jpg`} alt="img"/></div>
                            </div>
                            <div id="img-othrs" className="pro-desc-disp-img1">                                
                                <div key={productData.images[0]} className="pdtn"><img className="all-imgs"src={`${productData.images[0]}.jpg`} onError={(e) => {(e.target.onerror = null); e.target.src="../images/default.png"}} alt="img" /></div>
                                <div key={productData.images[1]} className="pdtn"><img className="all-imgs"src={`${productData.images[1]}.jpg`} onError={(e) => {(e.target.onerror = null); e.target.src="../images/default.png"}} alt="img" /></div>
                                <div key={productData.images[2]} className="pdtn"><img className="all-imgs"src={`${productData.images[2]}.jpg`} onError={(e) => {(e.target.onerror = null); e.target.src="../images/default.png"}} alt="img" /></div>
                                <div key={productData.images[3]} className="pdtn"><img className="all-imgs"src={`${productData.images[3]}.jpg`} onError={(e) => {(e.target.onerror = null); e.target.src="../images/default.png"}} alt="img" /></div>
                            </div>
                        </div>
                        <div className="pro-desc-det-box">
                            <h2 id="pro-desc-prod-name">{productData.name}</h2>
                            <h4 id="spec-heading">Specifications</h4>
                            <hr/>
                            <ul id="specs">
                                {productData.specification.map(spec=>{
                                    return <li key={spec.propertyName}>{spec.propertyName}: {spec.propertyValue}</li>
                                })}
                            </ul>
                            <h3>&#x20b9; {productData.price}</h3>
                            <label id="label">Units:</label>
                            <select id="opt-slctr" name="quantity" onChange={this.handleChange} value={this.state.quantity}>
                                <option htmlFor="quantity" value="1" defaultValue>1</option>
                                <option htmlFor="quantity" value="2">2</option>
                                <option htmlFor="quantity" value="3">3</option>
                                <option htmlFor="quantity" value="4">4</option>
                                <option htmlFor="quantity" value="5">5</option>
                            </select>
                            <div className="des-btn-box">
                                {
                                    cartProductIds.includes(productData.productId) ?
                                    <Link to="/cart"><button className="prd-des-btn prd-dec-add-btn">Add to Cart</button></Link>
                                    :
                                    <button className="prd-des-btn prd-dec-add-btn" onClick={this.handleAddToCart}>Add to Cart</button>
                                }
                                {
                                    cartProductIds.includes(productData.productId) ?
                                    <Link to="/cart"><button className="prd-des-btn prd-dec-buy-btn">Buy Now</button></Link>
                                    :
                                    <button className="prd-des-btn prd-dec-buy-btn" onClick={this.handleBuy}>Buy Now</button>
                                }
                            </div>
                        </div>
                    </div>
                    
                </React.Fragment>
            )
        }else{
            return null;
        }        
    }
}

export default ProductDescription;
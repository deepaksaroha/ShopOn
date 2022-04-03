import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/Productcard.css'

function ProductCard(props){

    function handleAddToCart(){
        axios.put('/api/users/cart',
            {
                productId: props.productId,
                name: props.name,
                quantity: 1,
                price: props.price
            }
        )
        .then(response=>{
            props.handleAddProduct();
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    function handleBuy(){
        axios.put('/api/users/cart',
            {
                productId: props.productId,
                name: props.name,
                quantity: 1,
                price: props.price
            }
        )
        .then(response=>{
            props.handleBuy();
        })
        .catch(error=>{
            console.log(error.error);
        })
    }



    return <div>
        <div className="product-card-box" id={props.productId}>
            <Link to={'/products/'+props.productId}>
                <div className="img-box"><img className="card-img" src={`${props.images[0]}.jpg`} alt=""/></div>
            </Link>
            <div className="card-details-box">
                <p className="card-product-title">{props.name}</p>
                <p className="card-price">&#8377; {props.price}</p>
                <div className="card-btns-box">
                    {
                        props.inCart?
                        <button className="addcart-btn"><Link to="/cart">Add to Cart</Link></button>
                        :
                        <button className="addcart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    }
                    {
                        props.inCart?
                        <button className="buy-btn"><Link to="/cart">Buy Now</Link></button>
                        :
                        <button className="buy-btn" onClick={handleBuy}>Buy Now</button>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default ProductCard;
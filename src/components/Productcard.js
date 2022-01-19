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
            <img className="card-img" src="../images/banner1.png" alt=""/>
            <p className="card-product-title"><Link to={'/products/'+props.productId}>{props.name}</Link></p>
            <p className="card-price">&#8377; {props.price}</p>
            <div className="card-btns">
                {
                    props.inCart?
                    <button><Link to="/cart">Add to Cart</Link></button>
                    :
                    <button onClick={handleAddToCart}>Add to Cart</button>
                }
                {
                    props.inCart?
                    <button><Link to="/cart">Buy Now</Link></button>
                    :
                    <button onClick={handleBuy}>Buy Now</button>
                }
            </div>
        </div>
    </div>
}

export default ProductCard;
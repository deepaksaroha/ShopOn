import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ProductCard(props){


    function handleAddToCart(){
        axios.put('https://localhot:4000/api/users/cart', 
            {
                data: {
                    productId: props.productId,
                    name: props.name,
                    quantity: 1,
                    price: props.price
                }
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
        axios.put('https://localhot:4000/api/users/cart',
            {
                data: {
                    productId: props.productId,
                    name: props.name,
                    quantity: 1,
                    price: props.price
                }
            }
        )
        .then(response=>{
            props.history.push('/cart');
        })
        .catch(error=>{
            console.log(error.error);
        })
    }



    return <div>
        <div id={props.productId}>
            <img src="" alt=""/>
            <p>{props.name}</p>
            <p>{props.price}</p>
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
}

export default ProductCard;
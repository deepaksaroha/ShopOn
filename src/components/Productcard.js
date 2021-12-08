import React from 'react'
import axios from 'axios'

function ProductCard(props){


    function handleAddToCart(){
        axios.get('https://localhot:4000/users/cart', 
            {
                data: {
                    productId: props.productData.productId,
                    name: props.productData.name,
                    quantity: 1,
                    price: props.productData.price
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
        axios.get('https://localhot:4000/users/cart', 
            {
                data: {
                    productId: props.productData.productId,
                    name: props.productData.name,
                    quantity: 1,
                    price: props.productData.price
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
        <div id={props.productData.productId}>
            <img src="" alt=""/>
            <p>{props.productData.name}</p>
            <p>{props.productData.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleBuy}>Buy Now</button>
        </div>
    </div>
}

export default ProductCard;
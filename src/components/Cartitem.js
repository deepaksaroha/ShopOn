import axios from 'axios';
import React from 'react';

class CartItem extends React.Component {

    handleMinus=()=>{
        axios.patch('/api/users/cart',{
            productId: this.props.item.productId,
            incValue: -1
        })
        .then(response=>{
            this.props.handleChangeItem();
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    handlePlus=()=>{
        axios.patch('/api/users/cart',{
            productId: this.props.item.productId,
            incValue: 1
        })
        .then(response=>{
            this.props.handleChangeItem()
        })
        .catch(error=>{
            console.log(error.error)
        })
    }

    handleDelete=()=>{
        axios.patch('/api/users/cart',{
            productId: this.props.item.productId
        })
        .then(response=>{
            this.props.handleChangeItem()
        })
        .catch(error=>{
            console.log(error.error)
        })
    }

    render(){
        const item = this.props.item;

        return (
            <React.Fragment>
                <div>
                    <img src="" alt="" />
                    <p>{item.name}</p>
                    <button onClick={this.handleMinus}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={this.handlePlus}>+</button>
                    <p>{item.price}</p>
                    <button onClick={this.handleDelete}>Delete</button>
                </div>
            </React.Fragment>
        )
    }
}

export default CartItem;
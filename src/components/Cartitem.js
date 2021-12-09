import axios from 'axios';
import React from 'react';

class CartItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleMinus(){
        if(this.props.item.quantity>1){
            axios.patch('https://localhost:4000/api/users/cart',{
                data:{
                    productId: this.props.item.productId,
                    incValue: -1
                }
            })
            .then(response=>{
                this.props.handleChangeItem();
            })
            .catch(error=>{
                console.log(error.error);
            })
        }
    }

    handlePlus(){
        axios.patch('https://localhost:4000/api/users/cart',{
            data:{
                productId: this.props.item.productId,
                incValue: 1
            }
        })
        .then(response=>{
            this.props.handleChangeItem()
        })
        .catch(error=>{
            console.log(error.error)
        })
    }

    handleDelete(){
        axios.delete('https://localhost:4000/api/users/cart',{
            data:{
                productId: this.props.item.productId
            }
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
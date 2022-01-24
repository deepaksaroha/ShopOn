import axios from 'axios';
import React from 'react';
import '../css/Cartitem.css'

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
                <td className="crt-row-dta"><div className="cart-img-bx"><img src={`../images/ID${item.productId}_1.jpg`} alt="" /></div></td>
                <td className="crt-row-dta"><p>{item.name}</p></td>
                <td className="crt-row-dta">
                    <p>
                        <button className="chng-btn" onClick={this.handleMinus}>-</button>
                        {item.quantity}
                        <button className="chng-btn" onClick={this.handlePlus}>+</button>
                    </p>
                </td>
                <td className="crt-row-dta"><p>&#8377;{item.price}</p></td>
                <td className="crt-row-dta"><button className="dle-btn" onClick={this.handleDelete}>X</button></td>
            </React.Fragment>
        )
    }
}

export default CartItem;
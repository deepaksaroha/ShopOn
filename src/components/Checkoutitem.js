import React from 'react';
import '../css/Checkoutitem.css'

class Checkoutitem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            quantity: null,
            price: null
        }
    }


    componentDidMount(){
        this.setState({
            name: this.props.item.name,
            quantity: this.props.item.quantity,
            price: this.props.item.price
        })
    }

    render(){
        return (
            <React.Fragment>
                <td><img src="" alt="" /></td>
                <td><p>{this.state.name}</p></td>
                <td><p>{this.state.quantity}</p></td>
                <td><p>{this.state.price * this.state.quantity}</p></td>
            </React.Fragment>
        )
    }
}

export default Checkoutitem;
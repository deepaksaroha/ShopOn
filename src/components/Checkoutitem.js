import React from 'react';

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
                <div>
                    <img src="" alt="" />
                    <p>{this.state.name}</p>
                    <p>{this.state.quantity}</p>
                    <p>{this.state.price * this.state.quantity}</p>                    
                </div>
            </React.Fragment>
        )
    }
}

export default Checkoutitem;
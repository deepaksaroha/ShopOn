import React from 'react';
import '../css/Checkoutitem.css'

class Checkoutitem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }


    render(){
        const item = this.props.item;

        return (
            <React.Fragment>
                <td><img className="chkout-img" src={`../images/ID${item.productId}_1.jpg`} alt="" /></td>
                <td><p>{item.name}</p></td>
                <td><p>{item.quantity}</p></td>
                <td><p>{item.price *item.quantity}</p></td>
            </React.Fragment>
        )
    }
}

export default Checkoutitem;
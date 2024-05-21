import axios from 'axios';
import React from 'react';
import Navbar from './Navbar'

class Orders extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            orders: []
        }
    }

    componentDidUpdate() {
        if(window.IntersectionObserver){
            const images = document.querySelectorAll(".gen-img");
            console.log(images);
    
            const intersectionObserver = new IntersectionObserver(
                (entries)=>{
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            const image = entry.target;
                            if(!image.src){
                                image.src = image.dataset.src;
                            }
                            intersectionObserver.unobserve(image);
                        }
                    })
                },
                {
                    rootMargin: "10px",
                    threshold: 0
                }
            )

            images.forEach(image => {
                intersectionObserver.observe(image);
            })

        }
    }

    componentDidMount(){
        Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions'), axios.get('/api/orders')])
        .then(responses=>{
            this.setState({
                cartCount: responses[0].data.cart.length,
                isLoggedIn: responses[1].data.loginStatus,
                orders: responses[2].data.orders,
                isLoaded: true
            })
        })
        .catch(error=>{
            console.log('something went wrong')
        })
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(()=>{
            this.props.history.push('/home');
        })
        .catch(error=>{
            console.log('something went wrong!');
        })
    }


    render(){

        if(this.state.isLoaded){        
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} {...this.props}/>
                    <div style={{margin: '20px'}}>
                        <h3>Orders</h3>
                        {
                            this.state.orders.map(orderData=>{
                                return <div key={orderData._id} style={{border: '1px solid black', margin: '10px', maxWidth: '500px'}}>
                                    <p>OrderId: {orderData._id}</p>
                                    <table style={{textAlign: 'left'}}>
                                        <thead>
                                            <tr style={{height: 'unset'}}>
                                                <th style={{border: '1px solid black'}}>Product</th>
                                                <th style={{border: '1px solid black'}}>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            orderData.products.map(product => {
                                                return <tr style={{height: 'unset'}} key={product.productId}>
                                                    <td style={{border: '1px solid black'}}>{product.name}</td>
                                                    <td style={{border: '1px solid black'}}>{product.quantity}</td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    <p>Total: {orderData.total/100}</p>
                                </div>
                            })
                        }
                    </div>
                </React.Fragment>
            )
        }else{
            return null;
        }
    }
}

export default Orders;
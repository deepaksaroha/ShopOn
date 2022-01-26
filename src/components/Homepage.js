import React from 'react'
import Navbar from './Navbar'
import Categories from './Categories'
// import Recommendations from './Recommendations'
import Banners from './Banners'
import axios from 'axios'
import '../css/Homepage.css'

class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            error: ''
        }
    }

    componentDidMount(){
        Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions')])
        .then(responses=>{
            this.setState({
                cart: responses[0].data.cart,
                cartCount: responses[0].data.cart.length,
                isLoggedIn: responses[1].data.loginStatus,
                isLoaded: true
            })
        })
        .catch(error=>{
            console.log('something went wrong')
        })
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            Promise.all([axios.get('/api/users/cart'), axios.get('/api/sessions')])
            .then(responses=>{
                this.setState({
                    cart: responses[0].data.cart,
                    cartCount: responses[0].data.cart.length,
                    isLoggedIn: responses[1].data.loginStatus,
                    isLoaded: true
                })
            })
            .catch(error=>{
                console.log('something went wrong')
            })
        })
        .catch(error=>{
            console.log('something went wrong')
        })
    }


    render(){
        if(this.state.isLoaded){
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} />
                    <Categories />
                    <Banners />
                    <div className="deals-outer-box">
                        <h3>DEALS OF THE DAY</h3>
                        <div>
                            <h4>Phones and Gadgets Deals</h4>
                            <div className="deals-box">
                                <a href="/products/1"><div className="deal-img-box"><img src="../images/ID1_1.jpg" alt="" /></div></a>
                                <a href="/products/2"><div className="deal-img-box"><img src="../images/ID2_1.jpg" alt="" /></div></a>
                                <a href="/products/3"><div className="deal-img-box"><img src="../images/ID3_1.jpg" alt="" /></div></a>
                            </div>
                        </div>
                        <div>
                            <h4>Fashion and Accesories</h4>
                            <div className="deals-box">
                                <a href="/products/6"><div className="deal-img-box"><img src="../images/ID6_1.jpg" alt="" /></div></a>
                                <a href="/products/7"><div className="deal-img-box"><img src="../images/ID7_1.jpg" alt="" /></div></a>
                                <a href="/products/8"><div className="deal-img-box"><img src="../images/ID8_1.jpg" alt="" /></div></a>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }else{
            return ''
        }
    }
}

export default Homepage;
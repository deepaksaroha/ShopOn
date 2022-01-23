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

    getLoginStatus=()=>{
        axios.get('/api/sessions')
        .then(response=>{
            this.setState({
                isLoggedIn: true,
                isLoaded: true
            })
        })
        .catch(_=>{
            this.setState({
                isLoggedIn: false,
                isLoaded: true
            })
        })
    }

    getCartCount=()=>{
        axios.get('/api/users/cart')
        .then(response=>{
            this.setState({
                cartCount: response.data.cart.length
            })
        })
        .catch(error=>{
            this.setState({
                error: error
            })
        })
    }

    componentDidMount(){
        this.getCartCount();
        this.getLoginStatus();
    }

    handleLogout=()=>{
        axios.delete('/api/sessions')
        .then(response=>{
            this.getCartCount();
            this.getLoginStatus();
        })
        .catch(_=>{
            this.getCartCount();
            this.getLoginStatus();
        })
        .catch(()=>{
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
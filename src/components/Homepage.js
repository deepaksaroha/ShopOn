import React from 'react'
import Navbar from './Navbar'
import Categories from './Categories'
// import Recommendations from './Recommendations'
import Banners from './Banners'
import axios from 'axios'

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
            console.log(error);
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
    }


    render(){
        if(this.state.isLoaded){
            return(
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} cartCount={this.state.cartCount} />
                    <Categories />
                    <Banners />
                    {/* <Recommendations /> */}
                </React.Fragment>
            )
        }else{
            return ''
        }
    }
}

export default Homepage;
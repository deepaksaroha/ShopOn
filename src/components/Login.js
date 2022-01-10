import React from 'react'
import axios from 'axios';
import Navbar from './Navbar'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            email: '',
            password: '',
            error: ''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    validateForm=()=>{
        if(this.state.email === '' || this.state.password === ''){
            this.setState({
                error: 'All fields are mandatory'
            })
            return false;
        }

        // if(!new RegExp('').test(this.state.email)){
        //     this.setState({
        //         error: 'Invalid email'
        //     })
        //     return false;
        // }    

        this.setState({
            error: ''
        })
        return true;
    }



    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.validateForm()){
            axios.post('/api/sessions', 
            {
                email: this.state.email,
                password: this.state.password
            })
            .then(response=>{
                this.props.history.goBack();
            })
            .catch(error=>{
                console.log(error.error);
            })
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
            return (
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.state.handleLogout} cartCount={this.state.cartCount}/>
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" password={this.state.password} onChange={this.handleChange} placeholder="password" />
                        <button onClick={this.handleSubmit}>Login</button>
                    </form>
                    <p>{this.state.error}</p>
                </React.Fragment>
            )
        }else{
            return ''
        }
        
    }

}

export default Login;
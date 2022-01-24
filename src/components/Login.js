import React from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import '../css/Login.css'

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
            return (
                <React.Fragment>
                    <Navbar loginStatus={this.state.isLoggedIn} handleLogout={this.state.handleLogout} cartCount={this.state.cartCount}/>
                    <div className="login-form-box">
                        <form>
                            <div><label htmlFor="email">Email:</label></div>
                            <div><input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email" /></div>
                            <div><label htmlFor="password">Password:</label></div>
                            <div><input type="password" name="password" password={this.state.password} onChange={this.handleChange} placeholder="password" /></div>
                            <div><button onClick={this.handleSubmit}>Login</button></div>
                        </form>
                        <p>{this.state.error}</p>
                    </div>
                </React.Fragment>
            )
        }else{
            return ''
        }
        
    }

}

export default Login;
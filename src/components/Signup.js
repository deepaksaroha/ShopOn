import axios from 'axios';
import React from 'react'
import Navbar from './Navbar';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            email: '',
            password: '',
            cnfPassword: '',
            error: '',
            successMsg: ''
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateForm = ()=>{
        if(this.state.email === '' || this.state.password === '' || this.state.cnfPassword === ''){
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

        // if(!new RegExp('').test(this.state.password)){
        //     this.setState({
        //         error: 'password not satisfying requirements'
        //     })
        //     return false;
        // }

        if(this.state.cnfPassword !== this.state.password){
            this.setState({
                error: 'passwords are not matching'
            })
            return false;
        }

        this.setState({
            error: ''
        })
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateForm()){
            axios.post('/api/users',{
                email: this.state.email,
                password: this.state.password
            })
            .then(response=>{
                this.setState({
                    successMsg: 'Signup Successfull'
                })
            })
            .catch(error=>{
                this.setState({
                    error: error.response.data.error,
                })
            })
        }
        
    }


    getLoginStatus=()=>{
        axios.get('/api/sessions')
        .then(response=>{
            this.props.history.push('/home')
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
            console.log('cart fetch no')
        })
    }

    componentDidMount(){
        this.getCartCount();
        this.getLoginStatus();
    }

    render(){
        if(this.state.isLoaded){
            return(
                <React.Fragment>
                    <Navbar loginStatus={false} handleLogout={()=>{}} cartCount={this.state.cartCount}/>
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name='email' value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder="password" />
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name='cnfPassword' value={this.state.cnfPassword} onChange={this.handleChange} placeholder="Re-enter password" />
                        <button onClick={this.handleSubmit}>Signup</button>
                    </form>
                    <p>{this.state.error}</p>
                    <p>{this.state.successMsg} {this.state.successMsg !== ''?<a href='/login'>Login</a>:''}</p>
                </React.Fragment>
            )
        }else{
            return null
        }
        
    }

}

export default Signup;
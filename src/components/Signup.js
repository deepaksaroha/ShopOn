import axios from 'axios';
import React from 'react'
import { validate } from 'uuid';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            cnfPassword: ''
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validateForm(){
        if(this.state.email === '' || this.state.password === '' || this.state.cnfPassword === ''){
            this.setState({
                error: 'All fields are mandatory'
            })
            return false;
        }

        if(!new RegExp('').test(this.state.email)){
            this.setState({
                error: 'Invalid email'
            })
            return false;
        }

        if(!new RegExp('').test(this.state.password)){
            this.setState({
                error: 'password not satisfying requirements'
            })
            return false;
        }

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

    handleSubmit(e){
        e.preventDefault();
        if(validate()){
            axios.post('https://localhost:4000/api/users',{
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(response=>{
                return response.json();
            })
            .then(response=>{
                this.props.history.push('/login');
            })
            .catch(error=>{
                this.setState({
                    error: error
                })
            })
        }
        
    }


    render(){
        return(
            <React.Fragment>
                <form>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name='email' value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <label for="password">Password:</label>
                    <input type="password" id="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder="password" />
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" name='cnfPassword' value={this.state.cnfPassword} onChange={this.handleChange} placeholder="Re-enter password" />
                    <button onClick={this.handleSubmit}>Signup</button>
                </form>
                <p>{this.state.error}</p>
            </React.Fragment>
        )
    }

}

export default Signup;
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
                    <input id="email" name='email' value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                    <label for="password">Password:</label>
                    <input id="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder="password" />
                    <label for="confirm-password">Confirm Password:</label>
                    <input id="confirm-password" name='cnfPassword' value={this.state.cnfPassword} onChange={this.handleChange} placeholder="Re-enter password" />
                    <button onClick={this.handleSubmit}>Signup</button>
                </form>
            </React.Fragment>
        )
    }

}
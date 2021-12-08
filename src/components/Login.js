import React from 'react'
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    validateForm(){
        if()

        if(!new RegExp('^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.com').test(this.state.email)){
            this.setState({
                error: 'Invalid email'
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
        if(this.validateForm()){
            axios.post('https://localhost:4000/api/sessions', 
            {
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(response=>{                
                this.props.history.goBack();
            })
            .catch(error=>{
                console.log(error.error);
            })
        }
    }

    


    render(){
        return (
            <React.Fragment>
                <form>
                    <label for="email">Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email" />
                    <label for="password">Password:</label>
                    <input type="password" name="password" password={this.state.password} onChange={this.handleChange} placeholder="password" />
                    <button onClick={this.handleSubmit}>Login</button>
                </form>
                <p>{this.state.error}</p>
            </React.Fragment>
        )
    }

}

export default Login;
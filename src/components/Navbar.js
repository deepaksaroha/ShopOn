import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            cartCount: 0,
            loginStatus: false
        }
    }

    getData(){
        axios.get('https://localhost:4000/api/users/cart')
        .then(response=>response.json())
        .then(response=>{
            this.setState({
                cartCount: response.cart.length
            })
        })
        .catch(error=>{
            console.log(error.error);
        })

        axios.get('https://localhost:4000/api/sessions')
        .then(response=>{
            this.setState({
                loginStatus: true
            })
        })
    }

    componentDidMount(){
        this.getData();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.cartCount !== prevProps.cartCount){
            this.getData();
        }
    }

    handleLogout(){
        axios.delete('https://localhost:4000/api/sessions')
        .then(response=>{
            this.props.history.push('/home');
        })
        .catch(error=>{
            console.log(error.error);
        })
    }

    render(){
        return (
            <React.Fragment>
                <Link to="/home">Home</Link>
                <form>
                    <input type="text" name="searchText" value={this.state.searchText} onChange={this.handleChange} />
                    <Link to={"/search/"+this.state.searchText}><button>Search</button></Link>
                </form>
                <Link to="/cart">Cart({this.state.cartCount})</Link>
                {
                    this.loginStatus ?
                    <button onClick={this.handleLogout}>Logout</button>
                    :
                    <span>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </span>
                }
            </React.Fragment>
        )
    }
}

export default Navbar;
import React from 'react'
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleLogout=()=>{
        this.props.handleLogout();
    }

    render(){
        return (
            <React.Fragment>
                <Link to="/home">Home</Link>
                <form>
                    <input type="text" name="searchText" value={this.state.searchText} onChange={this.handleChange} />
                    <Link to={this.state.searchText !== '' ? "/search/"+this.state.searchText: ''}><button>Search</button></Link>
                </form>
                <Link to="/cart">Cart({this.props.cartCount})</Link>
                {
                    this.props.loginStatus ?
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
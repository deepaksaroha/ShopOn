import React from 'react'
import '../css/Navbar.css'
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
                <div className="navbar">
                    <Link to="/home">Home</Link>
                    <form action={this.state.searchText !== ""? "/search": "#"}>
                        <input id="navbar-srch-inputbox" type="text" name="searchText" value={this.state.searchText} onChange={this.handleChange} />
                        <button id="srch-btn"><img className="all-img" src="../images/srch_b.svg" alt="search"/></button>
                    </form>
                    <Link to="/cart">Cart({this.props.cartCount})</Link>
                    {
                        this.props.loginStatus ?
                        <button id="nb-logout-btn" onClick={this.handleLogout}>Logout</button>
                        :
                        <span >
                            <Link className="nb-acc-links" to="/login">Login</Link>
                            <Link className="nb-acc-links" to="/signup">Signup</Link>
                        </span>
                    }
                </div>
                <div id="navbar-margin-box"></div>
            </React.Fragment>
        )
    }
}

export default Navbar;
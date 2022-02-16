import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            isMobile: false
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.cartCount !== nextProps.cartCount ||
        this.state.searchText !== nextState.searchText ||
        this.props.loginStatus !== nextProps.loginStatus ||
        this.props.isMobile !== nextState.isMobile){
            return true;
        }
        return false;
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSearch=(e)=>{
        e.preventDefault();
        if(this.state.searchText !== ""){
            this.props.history.push(`/search?searchText=${this.state.searchText}`);
        }
    }

    expandAccOption=()=>{
        this.setState({
            isMobile: !this.state.isMobile
        })
    }


    render(){
        console.log(this.state.isMobile)
        const accOpt = 
        <div className="account-box">
        {
            this.props.loginStatus ?
            <button id="nb-logout-btn" onClick={this.props.handleLogout}>Logout</button>
            :
            <span>
                <Link className="nb-acc-links" to="/login">Login</Link>
                <Link className="nb-acc-links" to="/signup">Signup</Link>
            </span>
        }
        </div>;

        return (
            <React.Fragment>
                <div className="navbar">
                    <Link to="/home">Home</Link>
                    
                    <form onSubmit={this.handleSearch}>
                        <input id="navbar-srch-inputbox" type="text" name="searchText" value={this.state.searchText} onChange={this.handleChange} />
                        <button id="srch-btn"><img className="all-img" src="../images/srch_b.svg" alt="search"/></button>
                    </form>

                    <Link to="/cart">
                        <span id="cart-desk">Cart({this.props.cartCount})</span>
                        <span id="cart-mob"><img className="icons" src="../images/cart.png" alt="" />({this.props.cartCount})</span>
                    </Link>

                    <div className="account-outer-box">
                        <img class="icons" onClick={this.expandAccOption} src="../images/account.png" alt="account"/>
                        {
                        this.state.isMobile ?
                            <div className="accb1">
                            {accOpt}
                            </div>
                            :
                            ""
                        }
                        <div className="accb2">
                            {accOpt}
                        </div>
                    </div>

                </div>
                <div id="navbar-margin-box"></div>
            </React.Fragment>
        )
    }
}

export default Navbar;
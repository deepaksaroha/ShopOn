import React from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            isMobile: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.props.cartCount !== nextProps.cartCount ||
            this.state.searchText !== nextState.searchText ||
            this.props.loginStatus !== nextProps.loginStatus ||
            this.props.isMobile !== nextState.isMobile
        ) {
            return true;
        }
        return false;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.searchText !== "") {
            this.props.history.push(
                `/search?searchText=${this.state.searchText}`
            );
        }
    };

    expandAccOption = () => {
        this.setState({
            isMobile: !this.state.isMobile,
        });
    };

    
    componentDidMount() {
        if(window.IntersectionObserver){
            const images = document.querySelectorAll(".gen-img");
            console.log(images);
    
            const intersectionObserver = new IntersectionObserver(
                (entries)=>{
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            const image = entry.target;
                            if(!image.src){
                                image.src = image.dataset.src;
                            }
                            intersectionObserver.unobserve(image);
                        }
                    })
                },
                {
                    rootMargin: "10px",
                    threshold: 0
                }
            )

            images.forEach(image => {
                intersectionObserver.observe(image);
            })

        }
    }

    render() {
        const accOpt = (
            <div className="account-box">
                {this.props.loginStatus ? (
                    <div>
                        <button
                            id="nb-logout-btn"
                            onClick={this.props.handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <span>
                        <Link className="nb-acc-links" to="/login">
                            Login
                        </Link>
                        <Link className="nb-acc-links" to="/signup">
                            Signup
                        </Link>
                    </span>
                )}
            </div>
        );

        return (
            <React.Fragment>
                <div className="navbar">
                    <Link to="/home">Home</Link>

                    <form onSubmit={this.handleSearch}>
                        <input
                            id="navbar-srch-inputbox"
                            type="text"
                            name="searchText"
                            value={this.state.searchText}
                            onChange={this.handleChange}
                        />
                        <button id="srch-btn">
                            <img
                                className="all-img gen-img"
                                srcSet="../images/srch_b.svg"
                                data-src="../images/srch_b.svg"
                                alt="search"
                            />
                        </button>
                    </form>

                    <Link to="/cart">
                        <span id="cart-desk">Cart({this.props.cartCount})</span>
                        <span id="cart-mob">
                            <img
                                className="icons gen-img"
                                srcSet="../images/cart.svg"
                                data-src="../images/cart.png"
                                alt=""
                            />
                            ({this.props.cartCount})
                        </span>
                    </Link>

                    {this.props.loginStatus && (
                        <Link to="/orders">
                            <span id="cart-desk">Orders</span>
                        </Link>
                    )}

                    <div className="account-outer-box">
                        <img
                            className="icons gen-img"
                            onClick={this.expandAccOption}
                            data-src="../images/account.png"
                            srcSet="../images/account.png"
                            alt="account"
                        />
                        {this.state.isMobile ? (
                            <div className="accb1">
                                {accOpt}
                                {this.props.loginStatus && (
                                    <div
                                        style={{
                                            border: "1px solid grey",
                                            width: "100%",
                                            boxSizing: "border-box",
                                            padding: "5px 0",
                                        }}
                                    >
                                        <Link to="/orders">Orders</Link>
                                    </div>
                                )}
                            </div>
                        ) : null}
                        <div className="accb2">{accOpt}</div>
                    </div>
                </div>
                <div id="navbar-margin-box"></div>
            </React.Fragment>
        );
    }
}

export default Navbar;

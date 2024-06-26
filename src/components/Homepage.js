import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Categories from "./Categories";
// import Recommendations from './Recommendations'
import Banners from "./Banners";
import axios from "axios";
import "../css/Homepage.css";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            cartCount: 0,
            error: "",
        };
    }

    componentDidUpdate() {        
        if (window.IntersectionObserver) {
            const images = document.querySelectorAll(".gen-img");
            console.log(images);

            const intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const image = entry.target;
                            if (!image.src) {
                                image.src = image.dataset.src;
                            }
                            intersectionObserver.unobserve(image);
                        }
                    });
                },
                {
                    rootMargin: "10px",
                    threshold: 0,
                }
            );

            images.forEach((image) => {
                intersectionObserver.observe(image);
            });
        }
    }

    componentDidMount() {
        Promise.all([axios.get("/api/users/cart"), axios.get("/api/sessions")])
            .then((responses) => {
                this.setState({
                    cart: responses[0].data.cart,
                    cartCount: responses[0].data.cart.length,
                    isLoggedIn: responses[1].data.loginStatus,
                    isLoaded: true,
                });
            })
            .catch((error) => {
                console.log("something went wrong");
            });
    }

    handleLogout = () => {
        axios
            .delete("/api/sessions")
            .then((response) => {
                Promise.all([
                    axios.get("/api/users/cart"),
                    axios.get("/api/sessions"),
                ])
                    .then((responses) => {
                        this.setState({
                            cart: responses[0].data.cart,
                            cartCount: responses[0].data.cart.length,
                            isLoggedIn: responses[1].data.loginStatus,
                            isLoaded: true,
                        });
                    })
                    .catch((error) => {
                        console.log("something went wrong");
                    });
            })
            .catch((error) => {
                console.log("something went wrong");
            });
    };

    render() {
        if (this.state.isLoaded) {
            return (
                <React.Fragment>
                    <Navbar
                        loginStatus={this.state.isLoggedIn}
                        handleLogout={this.handleLogout}
                        cartCount={this.state.cartCount}
                        {...this.props}
                    />
                    <Categories />
                    <Banners />
                    <div className="deals-outer-box">
                        <h3 id="deal-head">DEALS OF THE DAY</h3>
                        <div className="sub-deal-box">
                            <h4>Phones and Gadgets</h4>
                            <hr style={{ background: "grey" }} />
                            <div className="deals-box">
                                <Link to="/products/1">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID1_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            IPhone 11 8 gb| 64 gb
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/products/2">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID2_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            IPhone 13 16 gb| 128 gb
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/products/3">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID3_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            SAMSUNG Galaxy F22 6gb | 128 gb
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="sub-deal-box">
                            <h4>Fashion and Accesories</h4>
                            <hr style={{ background: "grey" }} />
                            <div className="deals-box">
                                <Link to="/products/6">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID6_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            Men's Blue Denim Jacket
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/products/7">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID7_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            Men's Olive Green Trousers
                                        </div>
                                    </div>
                                </Link>
                                <Link to="/products/8">
                                    <div className="deal-img-box">
                                        <img
                                            className="gen-img"
                                            data-src="../images/ID8_1.jpg"
                                            alt=""
                                        />
                                        <div className="deal-name">
                                            White Men Casual Sneeker Shoes
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return "";
        }
    }
}

export default Homepage;

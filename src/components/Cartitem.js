import axios from "axios";
import React from "react";
import "../css/Cartitem.css";

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleQunatityChange = (val) => {
        console.log("1");
        axios
            .patch("/api/users/cart", {
                productId: this.props.item.productId,
                incValue: val,
            })
            .then((response) => {
                this.props.handleChangeItem();
            })
            .catch((error) => {
                console.log(error.error);
            });
    };

    handleDelete = () => {
        axios
            .patch("/api/users/cart", {
                productId: this.props.item.productId,
            })
            .then((response) => {
                this.props.handleChangeItem();
            })
            .catch((error) => {
                console.log(error.error);
            });
    };

    componentDidMount() {
        console.log("dsadsadsa");
        if (window.IntersectionObserver) {
            const images = document.querySelectorAll(".gen-img");
            // console.log(images);

            const intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            console.log(entry);
                            const image = entry.target;
                            if (!image.srcset) {
                                image.srcset = image.dataset.srcset;
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

    render() {
        const item = this.props.item;

        return (
            <React.Fragment>
                <td className="crt-row-dta">
                    <div className="cart-img-bx">
                        <img
                            className="gen-img"
                            srcSet={`
                                ../images/ID${item.productId}_1_250.jpg 250w,
                                ../images/ID${item.productId}_1_125.jpg 125w,
                                `}
                            data-src={`../images/ID${item.productId}.jpg`}
                            sizes="(max-width: 500px) 125px, 250px"
                            alt=""
                        />
                    </div>
                </td>
                <td className="crt-row-dta">
                    <p className="item-name">{item.name}</p>
                </td>
                <td className="crt-row-dta">
                    <p className="chng-btn-box">
                        <button
                            className="chng-btn"
                            onClick={() => this.handleQunatityChange(-1)}
                        >
                            -
                        </button>
                        <span className="item-qty">{item.quantity}</span>
                        <button
                            className="chng-btn"
                            onClick={() => this.handleQunatityChange(1)}
                        >
                            +
                        </button>
                    </p>
                </td>
                <td className="crt-row-dta">
                    <p>&#8377;{item.price}</p>
                </td>
                <td className="crt-row-dta">
                    <button className="dle-btn" onClick={this.handleDelete}>
                        X
                    </button>
                </td>
            </React.Fragment>
        );
    }
}

export default CartItem;

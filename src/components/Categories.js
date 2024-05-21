import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Categories.css";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showCats: false,
            error: "",
        };
    }

    componentDidMount() {
        axios
            .get("/api/categories")
            .then((response) => {
                this.setState({
                    categories: response.data.categories,
                });
            })
            .catch((error) => {
                console.log(error.error);
            });
    }

    toggleCats = () => {
        this.setState((state, props) => ({ showCats: !state.showCats }));
    };

    render() {
        const element = this.state.categories.map((category) => {
            return (
                <div
                    className="category"
                    onClick={this.toggleCats}
                    key={category.categoryId}
                >
                    <div className="category-link">
                        <Link to={"/category/" + category.name}>
                            {category.name}
                        </Link>
                    </div>
                    <div className="subcategories-box">
                        {category.subcategories.map((subcategory) => {
                            return (
                                <Link
                                    to={"/category/" + subcategory}
                                    key={subcategory}
                                >
                                    {subcategory}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            );
        });

        return (
            <React.Fragment>
                {this.state.showCats ? <div id="overlay"></div> : null}
                <div>
                    {!this.state.showCats ? (
                        <button id="exp-btn" onClick={this.toggleCats}>
                            <img className="gen-img" data-src="../images/ham.png" alt="Menu" />
                        </button>
                    ) : null}
                </div>
                <div className="categories-outer-box">
                    <div className="cat-box" id="full-screen">
                        {element}
                    </div>
                    {this.state.showCats ? (
                        <div className="cat-box" id="small-screen">
                            <button
                                id="exp-btn"
                                onClick={this.toggleCats}
                                style={{ display: "inline" }}
                            >
                                <img
                                    className="gen-img"
                                    data-src="../images/arrow_back.png"
                                    alt="Menu"
                                />
                            </button>
                            Categories
                            {element}
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default Categories;

import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Categories.css'

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            error: ''
        }
    }

    componentDidMount(){
        axios.get('/api/categories')
        .then(response=>{
            this.setState({
                categories: response.data.categories
            })
        })
        .catch(error=>{
            console.log(error.error)
        })
    }

    render(){

        return(
            <React.Fragment>
                <div className="categories-outer-box">
                    {
                        this.state.categories.map(category=>{
                            return <div className="category" key={category.categoryId}>
                                <Link to={"/category/"+category.name}>{category.name}</Link>
                                <div className="subcategories-box">
                                    {
                                        category.subcategories.map(subcategory=>{
                                            return <Link to={"/category/"+subcategory} key={subcategory}>{subcategory}</Link>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </React.Fragment>
        )
    }

}

export default Categories;
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            error: ''
        }
    }

    componentDidMount(){
        axios.get('https://localhost:4000/api/categories')
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            this.setState({
                categories: response.categories
            })
        })
        .catch(error=>{
            console.log(error.error)
        })
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    {
                        this.state.categories.map(category=>{
                            return <div key={category.categoryId}>
                                <Link to={"/category/"+category.name}>category.categoryName</Link>
                                <div>
                                    {
                                        category.subcategories.map(subcategory=>{
                                            return <Link to={"/category/"+subcategory} key={subcategory}>subcategory</Link>
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
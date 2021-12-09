import React from 'react'
import Navbar from '../components/Navbar'
import Categories from '../components/Categories'
import Recommndations from '../components/Recommndations'
import Banners from '../components/Banners'

class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <React.Fragment>
                <Navbar />
                <Categories />
                {/* <Banners />
                <Recommndations /> */}
            </React.Fragment>
        )
    }
}

export default Homepage;
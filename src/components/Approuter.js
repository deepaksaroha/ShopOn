import React from 'react'
import Homepage from './Homepage'
import Cart from './Cart'
import Checkout from './Checkout'
import Login from './Login'
import Productlist from './Productlist'
import Signup from './Signup'
import Product from './Product'
import { Route, Switch } from 'react-router-dom'

class AppRouter extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/category/:category" component={Productlist} />
                <Route path="/search/:searchText" component={Productlist} />
                <Route path="/products/:productId" component={Product} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
        )
    }
    
}

export default AppRouter;
import React from 'react'
import Homepage from './Homepage'
import Cart from './Cart'
import Checkout from './Checkout'
import Login from './Login'
import Productlist from './Productlist'
import Signup from './Signup'
import ProductDescription from './Productdescription'
import { Route, Switch } from 'react-router-dom'

class AppRouter extends React.Component{
    
    render(){
        return(
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/home" component={Homepage} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/category/:category" component={Productlist} />
                    <Route path="/search/:searchText" component={Productlist} />
                    <Route path="/products/:productId" component={ProductDescription} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            )
        
    }

}

export default AppRouter;
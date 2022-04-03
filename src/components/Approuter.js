import React from 'react'
import Homepage from './Homepage'
import Cart from './Cart'
import Checkout from './Checkout'
import Login from './Login'
import Productlist from './Productlist'
import Signup from './Signup'
import ProductDescription from './Productdescription'
import { Route, Switch } from 'react-router-dom'
import Order from './Order'
import Orders from './Orders'
import Footer from './Footer'

class AppRouter extends React.Component{
    
    render(){
        return(
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/home" component={Homepage} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/category/:category" component={Productlist} />
                    <Route path="/search" component={Productlist} />
                    <Route path="/products/:productId" component={ProductDescription} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} exact/>
                    <Route path="/orders/:orderId" component={Order} />
                </Switch>
                <Footer />
            </React.Fragment>
            )
    }
}

export default AppRouter;
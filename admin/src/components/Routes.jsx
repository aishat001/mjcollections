import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/dashboard/Dashboard'
import Customers from '../pages/customers/Customers'
import NewProduct from '../pages/newProduct/NewProduct'
import Products from '../pages/productList/Products'
import Product from '../pages/product/Product'
import { useSelector } from 'react-redux'
import Login from '../pages/login/Login'

const Routes = () => {
    const user = useSelector((state) => state.user);

    return (
        <Switch>
                                    <Route path='/' exact component={Dashboard}/>

            <Route path='/customers' component={Customers}/>
            <Route path='/newEntries' component={NewProduct}/>
            <Route path='/viewEntries' component={Products}/>
            <Route path='/product/:id' component={Product}/>
            

        </Switch>
    )
}

export default Routes

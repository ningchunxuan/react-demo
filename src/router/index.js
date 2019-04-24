import React from 'react'
import {Route, IndexRoute} from 'react-router'

import AppComponent from '../components/app/app'
import HomeComponent from '../components/home/home'
import Goodslist from '../components/goodslist/index.js'
import Cakelist from '../components/cakelist/index.js'
import Ice from '../components/ice-cream/index.js'
import Temperature from '../components/temperature/index.js'
import Bread from '../components/bread/index.js'
import Usernamelist from '../components/usernamelist/index.js'
import Buycarlist from '../components/buycarlist/index.js'
import Login from '../components/login/index.js'


const routes = (
    <Route path="/" component={AppComponent}>
        <IndexRoute component={Login}/>
        <Route path="login" component={Login}/>
        <Route path="home" component={HomeComponent}>
            <IndexRoute component={Goodslist}/>
            <Route path="goodslist" component={Goodslist}/>
            <Route path="cakelist" component={Cakelist}/>
            <Route path="ice" component={Ice}/>
            <Route path="temperature" component={Temperature}/>
            <Route path="bread" component={Bread}/>
            <Route path="usernamelist" component={Usernamelist}/>
            <Route path="buycarlist" component={Buycarlist}/>
        </Route>
    </Route>
)

export default routes;
import React from 'react'
import { Route } from 'react-router-dom'

import Main from './scenes/Main'
import User from './scenes/User'
import NavBar from './NavBar'

const Admin = () => (
    <div className="container-fluid">
        <NavBar/>

        <Route exact path="/admin" component={Main}/>
        <Route path="/admin/page/:page" component={Main}/>
        <Route path="/admin/user/:id" component={User} />
    </div>
)

export default Admin
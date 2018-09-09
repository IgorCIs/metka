import React from 'react'
import Main from './scenes/Main'
import User from './scenes/User'
import { Route } from 'react-router-dom'

const Admin = () => (
    <div className="container-fluid">
        <h1 className="h1">Админ</h1>

        <Route exact path="/admin" component={Main}/>
        <Route path="/admin/page/:page" component={Main}/>
        <Route path="/admin/user/:id" component={User} />
    </div>
)

export default Admin
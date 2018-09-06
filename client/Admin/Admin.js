import React from 'react'
import Main from './scenes/Main'
import User from './scenes/User'
import { Route } from 'react-router-dom'

const Admin = () => (
    <div>
        <h1>Admin</h1>

        <Route exact path="/admin" component={Main}/>
        <Route path="/admin/:id" component={User} />
    </div>
)

export default Admin
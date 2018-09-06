import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './scenes/Main'
import User from './scenes/User'

const Admin = () => (
    <Router>
        <div>
            <h1>Admin</h1>

            <Route exact path="/admin" component={Main}/>
            <Route path="/admin/:id" component={User} />
        </div>
    </Router>
)

export default Admin
import React from 'react'
import { Link } from 'react-router-dom'

import Search from './Search'

const NavBar = () => (
    <nav className="navbar navbar-light bg-light">
        <h3 className="h3">
            <Link to="/admin">Админ</Link>
        </h3>

        <Search/>
    </nav>
)

export default NavBar


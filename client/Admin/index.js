import React from 'react'
import { render } from 'react-dom'
import Admin from './Admin'
import { Provider } from 'react-redux'
import storeFactory from '../store'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'

import 'bootstrap/scss/bootstrap.scss'

const renderWithStore = store => render(
    <Provider store={store}>
        <Router>
            <Admin />
        </Router>
    </Provider>,
    document.getElementById('root')
)

if (process.env.side === 'client' && process.env.env === 'development') {
    axios.get('/api/users').then(res => {
        const { users = [] } = res.data

        renderWithStore(storeFactory({
            users,
            count: 30,
            sort: {key: 'fullname', sign: '+'} }))
    })
} else
    renderWithStore(storeFactory({
        users: window.__INITIAL_STATE__ || [],
        count: 30,
        sort: {key: 'fullname', sign: '+'}
    }))
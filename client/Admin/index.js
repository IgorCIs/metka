import React from 'react'
import { render } from 'react-dom'
import Admin from './Admin'
import { Provider } from 'react-redux'
import storeFactory from '../store'
import axios from 'axios'

const renderWithStore = store => render(
    <Provider store={store}>
        <Admin />
    </Provider>,
    document.getElementById('root')
)

if (process.env.side === 'client' && process.env.env === 'development') {
    axios.get('api/users').then(res => {
        console.log(res)

        const { users = [], pages = 1, page = 1, sort = '+fullname' } = res.data

        renderWithStore(storeFactory({users, pages, page, sort}))
    })
} else
    renderWithStore(storeFactory(window.__INITIAL_STATE__ || []))


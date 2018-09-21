import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

import 'bootstrap/scss/bootstrap-reboot.scss'
import 'bootstrap/scss/bootstrap-grid.scss'
import './generals/generals.scss'

setTimeout(() => {
    document.getElementById('root').innerHTML = ''
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
}, 2000)
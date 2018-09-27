import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import axios from 'axios'

import App from './App'
import store from './store'

import 'bootstrap/scss/bootstrap-reboot.scss'
import 'bootstrap/scss/bootstrap-grid.scss'

import './generals/generals.scss'

axiosSetDefault(axios, window.__KEY__)

setTimeout(() => {
    document.getElementById('root').innerHTML = ''
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
}, 2000)
import React from 'react'
import { render } from 'react-dom'
import Login from './Login'
import axios from 'axios'

import axiosSetDefault from '../util/deaultAxios'

axiosSetDefault(axios, window.__KEY__)

import 'bootstrap/scss/bootstrap.scss'

axios.get('/api/admins/isloged').then(
    res => {
        console.log(res)

        res.data.logged ?
            window.location = '/admin' :
            render(<Login/>, document.getElementById('root'))
    },
    err => console.error(err)
)
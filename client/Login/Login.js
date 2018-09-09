import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        error: false,
        login: '',
        pass: ''
    }

    submit = event => {
        event.preventDefault()

        const { login, pass } = this.state

        axios.get(`/api/admins/login?login=${login}&password=${pass}`).then(
            res => {
                if (!res.data.logged) this.setState({error: true})
                else window.location = '/admin'
            },
            err => console.dir(err)
        )
    }

    handleChange = key => event => {
        this.setState({[key]: event.target.value})
    }

    render() {
        const { error, login, pass } = this.state

        return (
            <div style={{
                position: 'fixed',
                top: '50%',
                width: '100%',
                transform: 'translateY(-50%)'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                            <div className="card">
                                <div className="card-header text-center">
                                    Вход
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.submit}>
                                        <div className="form-group">
                                            <label>Логин</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Логин"
                                                value={login}
                                                required
                                                onChange={this.handleChange('login')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Пароль</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder="Пароль"
                                                value={pass}
                                                required
                                                onChange={this.handleChange('pass')}
                                            />
                                        </div>
                                        <button className="btn btn-primary" type="submit">Вход</button>
                                        {error && <div style={{
                                            marginTop: '20px'
                                        }} className="alert alert-danger" role="alert">
                                            Неверный логин или пароль
                                        </div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
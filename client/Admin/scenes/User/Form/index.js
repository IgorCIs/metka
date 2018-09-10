import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser } from '../../../../store/actions'
import axios from 'axios'

class Form extends Component{
    constructor(props, context) {
        super(props, context)

        console.log(props.user)
    }

    state = {
        user: {...this.props.user},
        sending: false,
        error: false,
        success: false,
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        update: PropTypes.func
    }

    submit = event => {
        event.preventDefault()

        const { update } = this.props
        const { _id, ...user} = this.state.user

        this.setState({ sending: true, success: false, error: false })

        axios.post(`/api/users/${_id}`, user).then(
            () => {
                this.setState({ sending: false, success: true })
                update(_id, user)
            },
            error => this.setState({ sending: false, error })
        )
    }

    eventContext = (value, key) => state => ({
        user: {
            ...state.user,
            [key]: value
        }
    })

    telsChange = event => this.setState (
        this.eventContext(event.target.value.split('\n'), 'tels')
    )

    inputChange = key => event =>
        this.setState(
            this.eventContext(event.target.value, key)
        )

    render() {
        const { user, sending, error, success } = this.state
        const { fullname, call, age, comment, company, tels, signs } = user

        return (
            <form onSubmit={this.submit}>
                <div className="row">

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label><span className="text-danger">*</span>ФИО:</label>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                placeholder="ФИО"
                                onChange={this.inputChange('fullname')}
                                value={fullname}
                                required/>
                        </div>

                        <div className="form-group">
                            <label><span className="text-danger">*</span>Обращение:</label>
                            <select
                                name="call"
                                value={'' + call}
                                required
                                onChange={this.inputChange('call')}
                                className="form-control">
                                <option value={'true'}>Вы</option>
                                <option value={'false'}>Ты</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Номера телефонов:</label>
                            <textarea
                                name="comment"
                                className="form-control"
                                onChange={this.telsChange}
                                value={tels.join('\n')}
                                rows="3"/>
                            <small className="form-text text-muted">
                                Вводите один номер телефона на строчку. Чем выше номер - тем он приоритетнее
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Особые приметы:</label>
                            <textarea
                                name="signs"
                                className="form-control"
                                onChange={this.inputChange('signs')}
                                value={signs}
                                rows="3"/>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Возраст:</label>
                            <input
                                type="number"
                                name="age"
                                className="form-control"
                                placeholder="Возраст"
                                onChange={this.inputChange('age')}
                                value={age}/>
                        </div>

                        <div className="form-group">
                            <label>Компания:</label>
                            <input
                                type="text"
                                name="company"
                                className="form-control"
                                placeholder="Компания"
                                onChange={this.inputChange('company')}
                                value={company}/>
                        </div>

                        <div className="form-group">
                            <label>Комментарий:</label>
                            <textarea
                                name="tels"
                                className="form-control"
                                onChange={this.inputChange('comment')}
                                value={comment}
                                rows="3"/>
                        </div>

                        {success && <div className="alert alert-success">
                            Данные отправленны
                        </div>}

                        {error && <div className="alert alert-danger">
                            Ошибка: {error}
                        </div>}

                        {sending && <div className="alert alert-light">
                            Отправка...
                        </div>}

                        <input
                            type="submit"
                            disabled={sending}
                            className="btn btn-success"
                            value="Сохранить"/>
                    </div>
                </div>
            </form>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    update(_id, user) {
        dispatch(updateUser(_id, user))
    }
})

export default connect(null, mapDispatchToProps)(Form)
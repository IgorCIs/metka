import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateUser } from '../../../../store/actions'
import axios from 'axios'

class Form extends Component{
    constructor(props, context) {
        super(props, context)
    }

    state = {
        ...this.props.user
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        update: PropTypes.func
    }

    submit = event => {
        event.preventDefault()

        const { update } = this.props
        const { _id, ...user} = this.state

        axios.post(`/api/users/${_id}`, user).then(
            () => update(_id, user),
            err => console.dir(err)
        )
    }

    inputChange = key => event => {
        this.setState({[key]: event.target.value})
    }

    render() {
        const { fullname, call } = this.state

        return (
            <form onSubmit={this.submit}>
                <table>
                    <tbody>
                        <tr>
                            <td>ФИО:</td>
                            <td>
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="ФИО"
                                    onChange={this.inputChange('fullname')}
                                    value={fullname}
                                    required/>
                            </td>
                        </tr>
                        <tr>
                            <td>Обращение:</td>
                            <td>
                                <select name="call" value={'' + call} required onChange={this.inputChange('call')}>
                                    <option value={'true'}>Вы</option>
                                    <option value={'false'}>Ты</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <input type="submit" value="Сохранить"/>
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
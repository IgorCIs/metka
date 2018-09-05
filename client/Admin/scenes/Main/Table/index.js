import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const stateToProps = state => ({
    users: state.users
})

const Table = ({ users = [] }) => (
    <table style={{width: '100%', border: '1px solid'}}>
        <thead style={{fontWeight: '700'}}>
            <tr>
                <td>№</td>
                <td>ФИО</td>
                <td>Код</td>
                <td>Вход</td>
                <td>Тип</td>
                <td>Дата захода</td>
                <td>Дата последнего захода</td>
            </tr>
        </thead>
        <tbody>
            {users.map((user, i) => (
                <tr key={user._id}>
                    <td>{i}</td>
                    <td>{user.fullname}</td>
                    <td>{user._id}</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                    <td>none</td>
                </tr>
            ))}
        </tbody>
    </table>
)

Table.propTypes = {
    users: PropTypes.array
}

export default connect(stateToProps, null)(Table)
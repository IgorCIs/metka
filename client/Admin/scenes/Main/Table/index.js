import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './Table.scss'
import axios from  'axios'
import { sortBy } from '../../../../store/actions'
import { Link } from 'react-router-dom'

const stateToProps = state => ({
    users: state.users,
    currentPage: state.page,
    sortKey: state.sort
})

const dispatchToProps = dispatch => ({
    sortBy(key, page) {
        axios(`api/users?sort=${key}&page=${page}`).then(res => {
            dispatch(sortBy(key, res.data.user))
        })
    }
})

const Table = ({ users = [], currentPage = 1, sortBy = () =>{} }) => (
    <table className={styles.table}>
        <thead>
            <tr>
                <td>№</td>
                <td onClick={sortBy.bind(null, '+fullname', currentPage)} className={styles.thead}>
                    ФИО
                </td>
                <td onClick={sortBy.bind(null, '+_id', currentPage)} className={styles.thead}>
                    Код
                </td>
                <td>Вход</td>
                <td>Тип</td>
                <td>Дата захода</td>
                <td>Дата последнего захода</td>
            </tr>
        </thead>
        <tbody>
            {users.map((user, i) => (
                <tr key={user._id}>
                    <td>{(i + 1) + (currentPage - 1) * 30}</td>
                    <td>
                        <Link to={`/admin/${user._id}`}>
                            {user.fullname}
                        </Link>
                    </td>
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
    users: PropTypes.array,
    currentPage: PropTypes.number,
    sortKey: PropTypes.string,
    sortBy: PropTypes.func
}

export default connect(stateToProps, dispatchToProps)(Table)
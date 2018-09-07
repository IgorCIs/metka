import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './Table.scss'
import { Link } from 'react-router-dom'
import SortingField from './SortingField'

const stateToProps = state => ({
    users: state.users,
    currentPage: state.page,
    sortKey: state.sort
})

const Table = ({ users = [], currentPage = 1 }) => (
    <table className={styles.table}>
        <thead>
            <tr>
                <td>№</td>
                <SortingField sortBy={'fullname'}>ФИО</SortingField>
                <SortingField sortBy={'_id'}>Код</SortingField>
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
                    <td>{user.fullname}</td>
                    <td>
                        <Link to={`admin/${user._id}`}>
                            {user._id}
                        </Link>
                    </td>
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
}

export default connect(stateToProps, null)(Table)
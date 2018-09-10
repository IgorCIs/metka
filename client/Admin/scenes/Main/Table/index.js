import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SortingField from './SortingField'
import UserTr from './UserTr'

const Table = ({ users, sort, count, page }) => {
    const from = (page - 1) * count
    const to = from + count

    const viewUsers = users
        .sort((a, b) => sort.sign === '+' ?
            (a[sort.key] > b[sort.key] ? 1 : -1) :
            (a[sort.key] < b[sort.key] ? 1 : -1))
        .reduce((users, user, index) => (index >= from && index < to) ? [...users, user] : users, [])

    return (
        <div className="table-responsive">
            <table className="table table-hover" style={{
                minWidth: '900px'
            }}>
                <thead>
                    <tr>
                        <th>№</th>
                        <SortingField sortBy={'fullname'}>ФИО</SortingField>
                        <SortingField sortBy={'_id'}>Код</SortingField>
                        <th>Вход</th>
                        <th>Тип</th>
                        <th>Дата захода</th>
                        <th>Дата последнего захода</th>
                    </tr>
                </thead>
                <tbody>
                    {viewUsers.map((user, i) => <UserTr
                        key={user._id}
                        user={user}
                        page={page}
                        count={count}
                        index={i}
                    />)}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    users: PropTypes.array,
    sort: PropTypes.object,
    count: PropTypes.number,
    page: PropTypes.number
}

const stateToProps = ({ users, sort, count }) => ({
    users,
    sort,
    count
})

export default connect(stateToProps, null)(Table)
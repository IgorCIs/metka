import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SortingField from './SortingField'
import UserTr from './UserTr'

const fromStrToKey = (obj, key) => {
    const [firstKey, ...keys] = key.split('.')

    return keys.length === 0 ? obj[firstKey] : fromStrToKey(obj[firstKey], keys.join('.'))
}

const Table = ({ users = [], sort, count, page }) => {
    const from = (page - 1) * count
    const to = from + count

    const viewUsers = users
        .sort((a, b) => !fromStrToKey(a, sort.key) ? 1 : !fromStrToKey(b, sort.key) ? -1 :
            sort.sign === '+' ?
                (fromStrToKey(a, sort.key) > fromStrToKey(b, sort.key) ? 1 : -1) :
                (fromStrToKey(a, sort.key) < fromStrToKey(b, sort.key) ? 1 : -1))
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
                        <SortingField sortBy={'dates.0'}>Дата захода</SortingField>
                        <SortingField sortBy={'dates.1'}>Дата последнего захода</SortingField>
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

const stateToProps = ({ users, sort, count, search }) => ({
    users: users.filter(user =>
        new RegExp(search, 'i').test(user.fullname) ||
        new RegExp(search, 'i').test(user._id)
    ),
    sort,
    count
})

export default connect(stateToProps, null)(Table)
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SortingField from './SortingField'
import UserTr from './UserTr'

const Table = ({ users = [], currentPage = 1 }) => (
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
                {users.map((user, i) => <UserTr
                    key={user._id}
                    user={user}
                    page={currentPage}
                    index={i}
                />)}
            </tbody>
        </table>
    </div>
)

Table.propTypes = {
    users: PropTypes.array,
    currentPage: PropTypes.number,
}

const stateToProps = state => ({
    users: state.users,
    currentPage: state.page,
    sortKey: state.sort
})

export default connect(stateToProps, null)(Table)
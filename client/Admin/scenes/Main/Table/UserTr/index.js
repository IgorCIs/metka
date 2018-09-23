import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const formatToDate = str => new Date(+str)

const toDayMonthYear = date => ({
    day: '' + date.getDate(),
    month: '' + date.getMonth(),
    year: '' + date.getFullYear()
})

const toLocalStr = ({ day, month, year }) =>
    `${day.length < 2 ? '0': ''}${day}.${month.length < 2 ? '0' : ''}${month}.${year[2]}${year[3]}`

const getDate = str => toLocalStr(toDayMonthYear(formatToDate(str)))

const typeByUser = ({ progressType, dates }) => progressType === true ? '✓' :
    progressType === false ? '✗' :
        dates[0] ? '...' : '-'

const circle = enable => (
    <div
        className={enable ? 'bg-success' : 'bg-light'}
        style={{
            display: 'inline-block',
            width: '15px',
            height: '15px',
            borderRadius: '50%'
        }}
    />
)

const UserTr = ({ user = {}, index = 1, page = 1, count }) => (
    <tr>
        <th>{(index + 1) + (page - 1) * count}</th>
        <td>{user.fullname}</td>
        <td>
            <Link to={`/admin/user/${user._id}`}>
                {user._id}
            </Link>
        </td>
        <td>{circle(!!user.dates[0])}</td>
        <td style={{ fontSize: '20px' }}>{typeByUser(user)}</td>
        <td>{user.dates[0] ? getDate(user.dates[0]) : '-'}</td>
        <td>{user.dates[1] ? getDate(user.dates[1]) : '-'}</td>
    </tr>
)

UserTr.propTypes = {
    user: PropTypes.object.isRequired,
    count: PropTypes.number,
    index: PropTypes.number,
    page: PropTypes.number
}

export default UserTr

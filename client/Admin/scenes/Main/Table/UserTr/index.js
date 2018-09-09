import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTr = ({ user = {}, index = 1, page = 1, count }) => (
    <tr>
        <th>{(index + 1) + (page - 1) * count}</th>
        <td>{user.fullname}</td>
        <td>
            <Link to={`/admin/user/${user._id}`}>
                {user._id}
            </Link>
        </td>
        <td>none</td>
        <td>none</td>
        <td>none</td>
        <td>none</td>
    </tr>
)

UserTr.propTypes = {
    user: PropTypes.object.isRequired,
    count: PropTypes.number,
    index: PropTypes.number,
    page: PropTypes.number
}

export default UserTr

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTr = ({ user = {}, index = 1, page = 1 }) => (
    <tr>
        <th>{(index + 1) + (page - 1) * 30}</th>
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
)

UserTr.propTypes = {
    user: PropTypes.object.isRequired,
    index: PropTypes.number,
    page: PropTypes.number
}

export default UserTr

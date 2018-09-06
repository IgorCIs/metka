import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const User = ({ users = [], match }) => {
    const user = users.filter(({ _id }) => _id === match.params.id)[0]

    return user ? (
        <div>
            <h3>{user._id}</h3>
        </div>
    ) : (
        <div style={{color: 'red'}}>
            User {match.params.id} not found
        </div>
    )
}

User.propTypes = {
    users: PropTypes.array,
    match: PropTypes.object
}

const stateToProps = state => ({
    users: state.users
})

export default connect(stateToProps, null)(User)
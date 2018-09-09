import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from './Form'

const User = ({ users = [], match }) => {
    const user = users.filter(({ _id }) => _id === match.params.id)[0]

    console.log(match.params.id, users)

    return user ? (
        <div>
            <h3>Код: {user._id}</h3>
            <Form user={user}/>
        </div>
    ) : (
        <div className="alert alert-danger">
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
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from './Form'
import Tests from './Tests'

const User = ({ users = [], match }) => {
    const user = users.filter(({ _id }) => _id === match.params.id)[0]

    return user ? (
        <div>
            <div className="row">
                <div className="col-8">
                    <h3 className="h3">Код: {user._id}</h3>
                    <Form user={user}/>
                </div>
                <div className="col-4">
                    <h3 className="h3">Тесты:</h3>
                    <Tests tests={user.tests}/>
                </div>
            </div>
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
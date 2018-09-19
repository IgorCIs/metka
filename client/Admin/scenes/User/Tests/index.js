import React from 'react'
import PropTypes from 'prop-types'

const Tests = ({ tests = {} }) => {
    return (
        <ul className="list-group">
            {Object.keys(tests).map(key => (
                <li key={key} className="list-group-item">
                    Тест {key}: {tests[key].answer + ' '}
                    <span className="badge badge-primary">{tests[key].count}</span>
                </li>
            ))}
        </ul>
    )
}

Tests.propTypes = {
    tests: PropTypes.object
}

export default Tests
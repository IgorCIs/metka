import React from 'react'
import PropTypes from 'prop-types'

const Tests = ({ tests = [] }) => {
    return (
        <ul className="list-group">
            {tests.map((test, index) => (
                <li key={index} className="list-group-item">
                    Тест #{index + 1}: {test.answer + ' '}
                    <span className="badge badge-primary">{test.attemptСount}</span>
                </li>
            ))}
        </ul>
    )
}

Tests.propTypes = {
    tests: PropTypes.array
}

export default Tests
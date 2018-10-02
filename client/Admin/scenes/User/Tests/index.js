import React from 'react'
import PropTypes from 'prop-types'
import compose from '../../../../util/compose'

const getObjectTime = time => ({
    seconds: Math.floor(time / 1000) % 60,
    minutes: Math.floor(time / 60000) % 60,
    hours: Math.floor(time / 3600000)
})

const timeToString = time => time < 10 ? `0${time}` : '' + time

const toLocaleString = ({ minutes, seconds, hours }) => ({
    seconds: timeToString(seconds),
    minutes: timeToString(minutes),
    hours: timeToString(hours)
})

const toString = (divider = ':') => ({ minutes, seconds, hours }) =>
    `${hours}${divider}${minutes}${divider}${seconds}`

const localTime = compose(
    getObjectTime,
    toLocaleString,
    toString(':')
)

const Tests = ({ tests = {} }) => {
    return (
        <ul className="list-group">
            {Object.keys(tests).map(key => (
                <li key={key} className="list-group-item">
                    Тест {key}: {tests[key].answer + ' '}
                    <span className="badge badge-primary">{tests[key].count}</span>
                    {' '}
                    {tests[key].time && <span className="badge badge-secondary">{localTime(tests[key].time)}</span>}
                </li>
            ))}
        </ul>
    )
}

Tests.propTypes = {
    tests: PropTypes.object
}

export default Tests
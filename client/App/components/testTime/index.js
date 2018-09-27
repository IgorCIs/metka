import React, { PureComponent } from 'react'
import { setTest } from '../../store'
import PropTypes from 'prop-types'

export default Test => class TestTimerWrapper extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        testName: PropTypes.string.isRequired
    }

    timeStart = 0
    timeEnd = 0

    componentDidMount() {
        this.timeStart = Date.now()
    }

    componentWillUnmount() {
        this.timeEnd = Date.now()
        setTest(
            this.props.testName,
            this.timeEnd - this.timeStart,
            'time'
        )
    }

    render() {
        return <Test/>
    }
}
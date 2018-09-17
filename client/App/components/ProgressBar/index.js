import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const EXCLUDE_VIEW = []

const ProgressBar = ({ progress, currentPage }) =>
    EXCLUDE_VIEW.indexOf(currentPage) === -1 ? (
        <div className="progress">
            <div className="line" style={{ width: progress * 100 + '%' }}/>
        </div>
    ) : null

ProgressBar.propTypes = {
    progress: PropTypes.number,
    currentPage: PropTypes.number
}

const mapStateToProps = ({ progress, history }) => ({
    progress,
    currentPage: history[history.length - 1]
})

export default connect(mapStateToProps, null)(ProgressBar)

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AnimWrapper from './AnimWrapper'

const AnimMounting = ({ children, index, currentPage, prevPage }) => {
    const mount = index === currentPage
    const animationType = prevPage === undefined ? 'none' :
        mount ?
            index > prevPage ? 'slideUpBottom' : 'slideDownTop' :
            index > currentPage ? 'slideDownBottom' : 'slideUpTop'
    
    return (
        <AnimWrapper mount={mount} animationType={animationType}>
            {children}
        </AnimWrapper>
    )
}

AnimMounting.propTypes = {
    index: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    prevPage: PropTypes.number
}

const mapStateToProps = ({ history }) => ({
    prevPage: history[history.length - 2],
    currentPage: history[history.length - 1],
})

export default connect(mapStateToProps, null)(AnimMounting)


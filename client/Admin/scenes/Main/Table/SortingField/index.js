import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortBy } from '../../../../../store/actions'
import styles from './SortingField.scss'

const Sorting = ({ children, sortBy, sort, currentSort }) => {
    const current = currentSort.key === sortBy
    const sign = current ? currentSort.sign : 'no-sign'

    const click = () => {
        const newSign = sign === '+' ? '-' : '+'

        sort(newSign, sortBy)
    }

    return (
        <th
            onClick={click}
            className={current ? 'text-primary' : ''} style={{
                cursor: 'pointer'
            }}>

            {children}

            {sign !== 'no-sign' &&
                <div
                    className={styles.arrow}
                    style={sign === '+' ? {transform: 'rotate(180deg)'} : {}}/>}
        </th>
    )
}

Sorting.propTypes = {
    sortBy: PropTypes.string.isRequired,
    sort: PropTypes.func,
    currentSort: PropTypes.object
}

const mapDispatchToProps = dispatch => ({
    sort(sign, key) {
        dispatch(sortBy({sign, key}))
    }
})

const mapStateToProps = state => ({
    currentSort: state.sort
})

export default connect(mapStateToProps, mapDispatchToProps)(Sorting)
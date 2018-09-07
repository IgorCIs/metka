import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { sortBy } from '../../../../../store/actions'
import styles from '../Table.scss'

const Sorting = ({ children, sortBy, currentSort, currentPage, sort }) => {
    const current = currentSort.search(new RegExp(sortBy)) !== -1
    const sign = current ? currentSort.replace(sortBy, '') : 'no-sign'

    const click = () => {
        const newSign = sign === '+' ? '-' : '+'
        const newSort = newSign + sortBy

        sort(currentPage, newSort)
    }

    return (
        <td
            onClick={click}
            className={styles.thead + (current ? ' ' + styles.active : '')}>

            {children}

            {sign !== 'no-sign' &&
                <div
                    className={styles.arrow}
                    style={sign === '+' ? {transform: 'rotate(180deg)'} : {}}/>}
        </td>
    )
}

Sorting.propTypes = {
    sortBy: PropTypes.string.isRequired,
    currentSort: PropTypes.string,
    currentPage: PropTypes.number,
    sort: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
    sort(page, newSort) {
        axios.get(`api/users?page=${page}&sort=${newSort}`).then(res => {
            dispatch(sortBy(newSort, res.data.users))
        })
    }
})

const mapStateToProps = state => ({
    currentSort: state.sort,
    currentPage: state.page
})

export default connect(mapStateToProps, mapDispatchToProps)(Sorting)
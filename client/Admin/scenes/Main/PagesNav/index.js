import React from 'react'
import styles from './PageNav.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const arrFromLength = (length = 0, index = 0) => length > 0 ? [
    index,
    ...arrFromLength(length - 1, index + 1)
] : []

const PagesNav = ({currentPage = 1, pageCount = 1}) => (
    <div className={styles.wrapper}>
        {arrFromLength(pageCount, 1).map(page =>
            <div key={page} className={`${styles.page} ${currentPage === page ? styles.active : ''}`}>
                {page}
            </div>)
        }
    </div>
)

PagesNav.propTypes = {
    currentPage: PropTypes.number,
    pageCount: PropTypes.number
}

const stateToProps = store => ({
    currentPage: store.page,
    pageCount: store.pages
})

export default connect(stateToProps, null)(PagesNav)
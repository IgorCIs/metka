import React from 'react'
import styles from './PageNav.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { setPage } from '../../../../store/actions'

const arrFromLength = (length = 0, index = 0) => length > 0 ? [
    index,
    ...arrFromLength(length - 1, index + 1)
] : []

const PagesNav = ({currentPage = 1, pageCount = 1, onClick = () => {}}) => (
    <div className={styles.wrapper}>
        {arrFromLength(pageCount, 1).map(page =>
            <div key={page} onClick={onClick.bind(null, page)} className={`${styles.page} ${currentPage === page ? styles.active : ''}`}>
                {page}
            </div>)
        }
    </div>
)

PagesNav.propTypes = {
    currentPage: PropTypes.number,
    pageCount: PropTypes.number,
    onClick: PropTypes.func
}

const stateToProps = store => ({
    currentPage: store.page,
    pageCount: store.pages
})

const dispatchToProps = dispatch => ({
    onClick(page) {
        axios(`/api/users?page=${page}`).then(res => {
            const { page, users } = res.data

            dispatch(setPage(page, users))
        })
    }
})

export default connect(stateToProps, dispatchToProps)(PagesNav)
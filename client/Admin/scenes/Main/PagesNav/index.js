import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const arrFromLength = (length = 0, index = 0) => length > 0 ? [
    index,
    ...arrFromLength(length - 1, index + 1)
] : []

const PagesNav = ({ currentPage = 1, length = 1 }) => (
    <ul className="pagination justify-content-center">
        {arrFromLength(length, 1).map(page =>
            <li key={page} className={`page-item${currentPage === page ? ' active' : ''}`}>
                <Link className="page-link" to={`/admin/page/${page}`}>
                    {page}
                </Link>
            </li>)
        }
    </ul>
)

PagesNav.propTypes = {
    currentPage: PropTypes.number,
    length: PropTypes.number
}

const mapStateToProps = state => ({
    length: Math.ceil(state.users.length / state.count)
})

export default connect(mapStateToProps, null)(PagesNav)
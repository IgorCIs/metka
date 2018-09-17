import React from 'react'
import PropTypes from 'prop-types'

import styles from './Layout.scss'

const Layout = ({ children, type = 'default', className = ''}) => {
    return (
        <div className={styles.layout + ' ' + styles[type]}>
            <div className={styles.inner + ' ' + className}>
                {children}
            </div>
        </div>
    )
}

const LAYOUT_TYPES = ['default', 'gradient', 'light']

Layout.propTypes = {
    type: PropTypes.oneOf(LAYOUT_TYPES),
    className: PropTypes.string
}

export default Layout
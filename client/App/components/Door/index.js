import React from 'react'
import PropTypes from 'prop-types'

import { goToView } from '../../store'
    
const click = callback => () => {
    goToView(10)
    callback()
}

const Door = ({ callback = () => {} }) => (
    <div className="fast" onClick={click(callback)}>
        <span className="fast-button">быстрый<br/>ответ</span>
    </div>
)

Door.propTypes = {
    callback: PropTypes.func
}

export default Door
import React from 'react'
import PropTypes from 'prop-types'

import { goToView } from '../../store'

const OnceAgain = ({ viewBack }) => (
    <div className="trymore">
        <span onClick={goToView.bind(null, viewBack)}>Спробуй ще</span>
    </div>
)

OnceAgain.propTypes = {
    viewBack: PropTypes.number.isRequired
}

export default OnceAgain
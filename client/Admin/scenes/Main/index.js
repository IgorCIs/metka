import React from 'react'
import Table from './Table'
import PropTypes from 'prop-types'
import PagesNav from './PagesNav'

const Main = ({ match }) => (
    <div>
        <Table page={parseInt(match.params.page) || 1}/>
        <PagesNav currentPage={parseInt(match.params.page) || 1}/>
    </div>
)

Main.propTypes = {
    match: PropTypes.object
}

export default Main
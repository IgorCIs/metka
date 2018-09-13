import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchValue } from '../../../store/actions'
import { Redirect } from 'react-router-dom'

const Search = ({ value = '', onChange = () => {} }) => (
    <form className="form-inline my-2 my-lg-0">
        <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            value={value}
            onChange={event => onChange(event.target.value)}
        />
        {value && <Redirect to="/admin"/>}
    </form>
)

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

const mapStateToProps = state => ({
    value: state.search
})

const mapDispatchToProps = dispatch => ({
    onChange(value) {
        dispatch(setSearchValue(value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
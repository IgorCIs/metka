import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchValue } from '../../../store/actions'
import { Redirect } from 'react-router-dom'

class Search extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        onChange: PropTypes.func
    }

    state = {
        value: ''
    }

    timeout = null

    onChange = event => {
        clearTimeout(this.timeout)

        this.setState({value: event.target.value})

        this.timeout = setTimeout(() => {
            this.props.onChange(this.state.value)
        }, 1000)
    }

    onSubmit = event => event.preventDefault()

    componentDidMount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { value } = this.state

        return (
            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Поиск"
                    aria-label="Search"
                    value={value}
                    onChange={this.onChange}
                />
                {value && <Redirect to="/admin"/>}
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onChange(value) {
        dispatch(setSearchValue(value))
    }
})

export default connect(null, mapDispatchToProps)(Search)
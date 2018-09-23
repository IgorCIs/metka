import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SortingField from './SortingField'
import UserTr from './UserTr'
import SortWorker from './sort.worker.js'

class Table extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        loading: false,
        viewUsers: [],
        page: 0,
        count: 0
    }

    sortWorker = new SortWorker()

    static propTypes = {
        users: PropTypes.array,
        sort: PropTypes.object,
        count: PropTypes.number,
        page: PropTypes.number
    }

    static defaultProps = {
        users: []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            loading: !state.loading
        }
    }

    asyncSortUsers = () => new Promise(resolve => {
        const { users, sort, count, page } = this.props

        const next = ({ data }) => {
            this.sortWorker.removeEventListener('message', next)
            resolve({ viewUsers: JSON.parse(data), count, page })
        }

        this.sortWorker.addEventListener('message', next)
        this.sortWorker.postMessage(JSON.stringify({ users, sort, count, page }))
    })

    componentDidUpdate() {
        if (this.state.loading)
            this.asyncSortUsers().then(({ viewUsers, count, page }) => this.setState({viewUsers, count, page}))
    }

    componentDidMount() {
        if (this.state.loading)
            this.asyncSortUsers().then(({ viewUsers, count, page }) => this.setState({viewUsers, count, page}))
    }

    componentWillUnmount() {
        this.sortWorker.terminate()
    }

    render() {
        const { viewUsers, loading, page, count } = this.state

        return (
            <div className="table-responsive position-relative">
                <table className="table table-hover" style={{
                    minWidth: '900px'
                }}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <SortingField sortBy={'fullname'}>ФИО</SortingField>
                            <SortingField sortBy={'_id'}>Код</SortingField>
                            <th>Вход</th>
                            <th>Тип</th>
                            <SortingField sortBy={'dates.0'}>Дата захода</SortingField>
                            <SortingField sortBy={'dates.1'}>Дата последнего захода</SortingField>
                        </tr>
                    </thead>
                    <tbody>
                        {viewUsers.map((user, i) => <UserTr
                            key={user._id}
                            user={user}
                            page={page}
                            count={count}
                            index={i}
                        />)}
                    </tbody>
                </table>

                {loading && <div
                    className="position-fixed"
                    style={{
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#007bff50',
                        zIndex: 100
                    }}
                >
                    <div
                        className="progress position-absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            width: '200px',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>}
            </div>
        )
    }
}

const stateToProps = ({ users, sort, count, search }) => ({
    users: users.filter(user =>
        new RegExp(search, 'i').test(user.fullname) ||
        new RegExp(search, 'i').test(user._id)
    ),
    sort,
    count
})

export default connect(stateToProps, null)(Table)
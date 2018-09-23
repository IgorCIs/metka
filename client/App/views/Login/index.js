import React, { PureComponent } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { goToView } from '../../store'
import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'
import { updateUser, setPropgress } from '../../store/actions'

class Login extends PureComponent{
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        onLoad: PropTypes.func,
        setUserToStore: PropTypes.func
    }

    state = {
        stage: 0,
        key: '',
        error: false
    }

    input = event => {
        const { value } = event.target

        if (value.length <= 5)
            this.setState({ key: value, error: false })

        if (value === 'admin' && process.env.env === 'development')
            goToView(1)
        else if (value.length === 5)
            axios.get(`/api/users/${value}`).then(
                res => {
                    if (res.data.user) {
                        const { user } = res.data
                        const [firstDate] = user.dates ? user.dates : []
                        const currentDate = Date.now()

                        this.props.setUserToStore({
                            ...res.data.user,
                            dates: [firstDate ? firstDate : currentDate, currentDate]
                        })
                        goToView(1)
                    } else this.setState({ error: true })

                },
                err => {
                    this.setState({ error: true })
                    console.error(err)
                }
            )
    }

    componentDidMount() {
        this.props.onLoad()

        setTimeout(() => {
            if (this.state.stage < 1)
                this.setState({stage: 1})

            setTimeout(() => {
                if (this.state.stage < 2)
                    this.setState({stage: 2})
            }, 6000)
        }, 3000)
    }

    stageView = () => {
        const { stage } = this.state

        switch(stage) {
        case 0:
            return (
                <div className="title capslock">
                    <TypingText key={0} text="Изменения здесь"/>
                </div>
            )
        case 1:
            return (
                <div className="title">
                    <TypingText key={1} text="Убедитесь, что никого нет рядом"/>
                </div>
            )
        case 2: {
            const { key, error } = this.state

            return (
                <div className={['input-wrapper', error ? 'input-wrapper_error' : undefined].join(' ')}>
                    <input
                        className="input code input-error"
                        type="text"
                        placeholder="Введите код"
                        value={key}
                        onChange={this.input}
                    />
                </div>
            )
        }
        default:
            return null
        }
    }

    render() {
        return (
            <Layout>
                {this.stageView()}
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onLoad() {
        dispatch(setPropgress(0))
    },
    setUserToStore(user) {
        dispatch(updateUser(user))
    }
})

export default connect(null, mapDispatchToProps)(Login)
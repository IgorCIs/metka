import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import { setPropgress, updateUser } from '../../store/actions'

const monthes = index => {
    switch(index) {
    case 0:
        return 'Январь'
    case 1:
        return 'Февраль'
    case 2:
        return 'Март'
    case 3:
        return 'Апрель'
    case 4:
        return 'Май'
    case 5:
        return 'Июнь'
    case 6:
        return 'Июль'
    case 7:
        return 'Август'
    case 8:
        return 'Сентябрь'
    case 9:
        return 'Октябрь'
    case 10:
        return 'Ноябрь'
    case 11:
        return 'Декабрь'
    default:
        return 'Январь'
    }
}

class BadFinal extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        user: PropTypes.object,
        progressFull: PropTypes.func,
        progressType: PropTypes.func,
        sending: PropTypes.func
    }

    state = {
        showPhone: false,
        telValue: '',
        day: ((new Date).getDate() + 1) % 31 || 31,
        month: (new Date).getMonth(),
        from: 11,
        to: 18,
        send: false,
    }

    generateMsg = () => {
        const { day, month, from, to } = this.state

        return `Перезвонить ${day} ${monthes(month)} c ${from}:00 до ${to}:00`
    }

    handleChange = key => event => {
        this.setState({[key]: event.target.value})
    }

    submit = event => {
        event.preventDefault()

        this.setState({send: true})

        this.props.sending(this.props.user, {
            callbackMessage: this.generateMsg(),
            tels:
                this.props.user.tels.indexOf(this.state.telValue) !== -1 ||
                !this.state.telValue ? this.props.user.tels :
                    [this.state.telValue, ...this.props.user.tels]
        })
    }

    componentDidMount() {
        this.props.progressFull()
        this.props.progressType(this.props.user)
    }

    showPhoneHandle = () => {
        this.setState({showPhone: true})
    }

    render() {
        const { showPhone, telValue, from, to, day, month, send } = this.state
        const { user } = this.props

        return (
            <Layout type="light" className="w-100 last_slide">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="video"> 
                                <video autoPlay style={{width: 100 + '%'}}>
                                    <source src={require(user.gender ? '../../generals/male.mp4' : '../../generals/female.mp4')}/>
                                </video>
                            </div>
                            <div className="text">
                                {user.comment ? user.comment : <br/>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="container">
                                <div className="title">Набери{user.call ? 'те' : ''} меня:</div>
                                {!showPhone && <div 
                                    className="title gradient-text telnum"
                                    onClick={this.showPhoneHandle}
                                    style={{cursor: 'pointer'}}>
                                        +3806x xxx xxxx
                                </div>}
                                {showPhone && <div className="title">
                                    <a href='tel:+38067 659 32 02' className='gradient-text telnum'> +38067 659 3202 </a>
                                </div>}
                                {!showPhone && <div className="show" onClick={this.showPhoneHandle}>показать</div>}
                                <div className="messengers">{'Viber/Telegram/WhatsApp'}</div>
                                <div className="messengers">Выбери{user.call ? 'те' : ''} дату</div>
                                <div className="input-dates">
                                    <select
                                        value={day}
                                        onChange={this.handleChange('day')}
                                    >
                                        {[...new Array(31).keys()].map(value => (
                                            <option key={value + 1} value={value + 1}>{value + 1}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={month}
                                        onChange={this.handleChange('month')}
                                    >
                                        {[...new Array(12).keys()].map(value => (
                                            <option key={value} value={value}>{monthes(value)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="timing">
                                    <div className="timing_input">
                                        <input
                                            className="timing_tel"
                                            type="text"
                                            placeholder="Введите номер"
                                            value={telValue}
                                            onChange={this.handleChange('telValue')}
                                        />
                                        <div className="timing_diap">
                                            c <select
                                                value={from}
                                                onChange={this.handleChange('from')}
                                            >
                                                {[...new Array(23).keys()].map(value => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                            {' '}до <select
                                                value={to}
                                                onChange={this.handleChange('to')}
                                            >
                                                {[...new Array(23).keys()].map(value => (
                                                    <option key={value} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={this.submit}>Отправить</button>

                                {send && <div>
                                    Complete
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    progressFull() {
        dispatch(setPropgress(1))
    },
    progressType(user) {
        dispatch(updateUser({
            ...user,
            progressType: true
        }))
    },
    sending(user, data) {
        dispatch(
            updateUser({
                ...user,
                ...data
            })
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BadFinal)

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import { setPropgress, updateUser } from '../../store/actions'

const monthes = index => {
    switch(index) {
    case 0:
        return 'января'
    case 1:
        return 'февраля'
    case 2:
        return 'марта'
    case 3:
        return 'апреля'
    case 4:
        return 'мая'
    case 5:
        return 'июня'
    case 6:
        return 'июля'
    case 7:
        return 'августа'
    case 8:
        return 'сентября'
    case 9:
        return 'октября'
    case 10:
        return 'ноября'
    case 11:
        return 'декабря'
    default:
        return 'января'
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
        telValue: '+380',
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
                            <div className="video" onEnded={()=> window.location = '#end'}> 
                                <video autoPlay style={{width: 100 + '%'}}>
                                    <source src={require(user.gender === undefined || user.gender === 1 ? '../../generals/male.mp4' : '../../generals/female.mp4')}/>
                                </video>
                            </div>
                            <div className="text">
                                {user.comment ? user.comment : <br/>}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="container">
                                <div className='namekravec'> Алексей Кравец </div>
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
                                <div className="messengers" id='end'>Выбери{user.call ? 'те' : ''} дату звонка</div>
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
                                        className='monthselect'
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
                                            placeholder="Введите номер телефона"
                                            value={telValue}
                                            maxLength={13}
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

                                {!send &&
                                    <button className='buttonSubmit' onClick={this.submit}>отправить</button>
                                }

                                {send && <div className='sended'>
                                    Спасибо, до встречи!
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

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import { setPropgress } from '../../store/actions'

class BadFinal extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        user: PropTypes.object,
        progressFull: PropTypes.func
    }

    state = {
        showPhone: false
    }

    componentDidMount() {
        this.props.progressFull()
    }

    showPhoneHandle = () => {
        this.setState({showPhone: true})
    }

    render() {
        const { showPhone } = this.state
        const { user } = this.props

        return (
            <Layout type="light" className="w-100 last_slide">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="video"/>
                            <div className="text">
                                {user.comment ? user.comment : <br/>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="title">Набери{user.call ? 'те' : ''} меня:</div>
                            {!showPhone && <div 
                                className="title gradient-text telnum"
                                onClick={this.showPhoneHandle}
                                style={{cursor: 'pointer'}}>
                                    +3809x xxx xxxx
                            </div>}
                            {showPhone && <div className="title">
                                <a href='tel:+38096 666 6666' className='gradient-text telnum'> +38096 666 6666 </a>
                            </div>}
                            {!showPhone && <div className="show" onClick={this.showPhoneHandle}>показать</div>}
                            <div className="messengers">{'Viber/Telegram/WhatsApp'}</div>
                            <div className="timing">
                                <div className="timing_title">либо я наберу {user.call ? 'вас' : 'тебя'} в удобное время</div>
                                <div className="timing_input">
                                    <input className="timing_tel" type="text" placeholder="Введите номер"/>
                                    <div className="timing_diap">c <input type="text" value="11" /> до <input type="text" value="18" /></div>
                                </div>
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BadFinal)

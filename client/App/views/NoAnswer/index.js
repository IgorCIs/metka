import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { pushToHistory } from '../../store/actions'
import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'

const NoAnswer = ({ prevPage, goToView }) => (
    <Layout type="gradient">
        <div className="container">
            <div className="row">
                <div
                    className="title col-12 capslock"
                    onClick={goToView.bind(null, prevPage)}
                    style={{
                        cursor: 'pointer'
                    }}
                >
                    <TypingText text="Ответ не здесь"/>
                    <span
                        style={{
                            display: 'inline-block',
                            borderTop: '20px solid transparent',
                            borderBottom: '20px solid transparent',
                            borderLeft: '25px solid #ffffff',
                            marginLeft: '20px'
                        }}
                    />
                </div>
            </div>
        </div>
    </Layout>
)

NoAnswer.propTypes = {
    prevPage: PropTypes.number,
    goToView: PropTypes.func
}

const mapStateToProps = ({ history }) => ({
    prevPage: history[history.length - 2]
})

const mapDispatchToProps = dispatch => ({
    goToView(page) {
        dispatch(pushToHistory(page))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NoAnswer)
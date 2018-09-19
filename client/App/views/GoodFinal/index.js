import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'
import { getUserCall, reloadProgress } from '../../store'
import OnceAgain from '../../components/OnceAgain'

export default class GoodFinal extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        text: 0,
        showPhone: false
    }

    componentDidMount() {
        reloadProgress(1)
    }

    render() {
        const { text, showPhone } = this.state

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="container">
                        <div className="title">
                            <TypingText
                                text={`Рад, что у ${getUserCall() ? 'вас' : 'тебя'} все хорошо!`}
                                callback={this.setState.bind(this, {text : 1})}
                            />
                        </div>
                        {text > 0 && <div className="title title_small">
                            <TypingText
                                text="вот мой номер на всякий случай!"
                                callback={this.setState.bind(this, {text : 2})}
                            />
                        </div>}
                        {text > 1 && <div>
                            {!showPhone && <div className="title title_small">+3809х ххх хххх!</div>}
                            {showPhone && <div className="title title_small">+38096 666 6666!</div>}
                            {!showPhone && <div
                                className="show"
                                style={{cursor: 'pointer'}}
                                onClick={() => this.setState({showPhone: true})}
                            >
                                Показать
                            </div>}
                        </div>}
                    </div>
                </Layout>
                <OnceAgain viewBack={1}/>
            </Fragment>
        )
    }
}
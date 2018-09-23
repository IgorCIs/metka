import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'
import { getUserCall, reloadProgress, setProgressType } from '../../store'
import OnceAgain from '../../components/OnceAgain'

export default class GoodFinal extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        text: 0,
        showPhone: false,
        nextText: false
    }

    componentDidMount() {
        reloadProgress(1)
        setProgressType(false)
    }

    startNextText = () => {
        this.setState({nextText: true})
    }

    render() {
        const { text, showPhone, nextText } = this.state

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
                        {text > 0 && <div className="title title_small" style= {{marginBottom: '30px'}}>
                            <TypingText
                                callback={this.startNextText}
                                text="вот мой номер"
                            />
                            <br/>
                            {nextText && <TypingText
                                text=" на всякий случай"
                                callback={this.setState.bind(this, {text : 2})}
                            />}
                        </div>}
                        {text > 1 && <div>
                            {!showPhone && <div
                                className="title title_small telnum"
                                onClick={this.showPhoneHandle} 
                                style={{cursor: 'pointer'}}>
                                    +3809х ххх хххх
                            </div>}
                            {showPhone && <div className="title title_small telnum">+38096 666 6666</div>}
                            {!showPhone && <div
                                className="show"
                                style={{cursor: 'pointer'}}
                                onClick={() => this.setState({showPhone: true})}
                            >
                                показать
                            </div>}
                        </div>}
                    </div>
                </Layout>
                <OnceAgain viewBack={1}/>
            </Fragment>
        )
    }
}
import React, { PureComponent, Fragment } from 'react'

import { reloadProgress, getUserCall, goToView, setTest } from '../../store'
import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'
import Door from '../../components/Door'

export default class Wish extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        reloadProgress(4 / 7)
    }

    state = {
        nextText: false
    }

    answer = value => () => {
        setTest('Wish', value)
        goToView(6)
    }

    startNextText = () => this.setState({nextText: true})

    render() {
        const { nextText } = this.state

        const call = getUserCall()

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="container">
                        <div className="row">
                            <div className="title col-12">
                                <TypingText callback={this.startNextText} text={`Есть в ${call ? 'Вашей' : 'твоей'} жизни желание, `}/>
                                <br/>
                                {nextText && <TypingText text={` которое ${call ? 'Вы' : 'ты'} предал${call ? 'и' : ''}?`}/>}
                            </div>
                            <div className="yesno col-12 row">
                                <div className="item" onClick={this.answer('Да')}>Да</div>
                                <div className="item" onClick={this.answer('Нет')}>Нет</div>
                            </div>
                        </div>
                    </div>
                </Layout>
                <Door callback={setTest.bind(null, 'Wish', 'Быстрый ответ')}/>
            </Fragment>
        )
    }
}
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

    answer = value => () => {
        setTest('Wish', value)
        goToView(6)
    }

    render() {
        const call = getUserCall()

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="container">
                        <div className="row">
                            <div className="title col-12">
                                <TypingText text={`Если в ${call ? 'Вашей' : 'твоей'} жизни желание, которое ${call ? 'Вы' : 'ты'} предал${call ? 'и' : ''}?`}/>
                            </div>
                            <div className="yesno col-12 row">
                                <div className="item" onClick={this.answer('да')}>Да</div>
                                <div className="item" onClick={this.answer('нет')}>Нет</div>
                            </div>
                        </div>
                    </div>
                </Layout>
                <Door callback={setTest.bind(null, 'Wish', 'Быстрый ответ')}/>
            </Fragment>
        )
    }
}
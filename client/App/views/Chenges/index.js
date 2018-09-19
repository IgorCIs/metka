import React, { PureComponent } from 'react'

import TypingText from '../../components/TypingText'
import Layout from '../../components/Layout'
import { reloadProgress, getUserCall, goToView, setTest } from '../../store'

export default class Changes extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        reloadProgress(1 / 7)
    }

    click = value => () => {
        setTest('Changes', value)
        goToView(2)
    }

    render() {
        return (
            <Layout className="w-100">
                <div className="container">
                    <div className="row">
                        <div className="title col-12">
                            <TypingText text={`Что для ${getUserCall() ? 'вас' : 'тебя'} изменения?`}/>
                        </div>
                        <div className="item-list row col-12">
                            <div className="item bird col" onClick={this.click('Птица')}/>
                            <div className="item arrow-right col" onClick={this.click('Поворот')}/>
                            <div className="item three-way col" onClick={this.click('Перекресток')}/>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
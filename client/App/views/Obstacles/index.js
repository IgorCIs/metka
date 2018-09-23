import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import { setTest, goToView, reloadProgress, getUserCall } from '../../store'
import Door from '../../components/Door'
import TypingText from '../../components/TypingText'

export default class Obstacles extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    click = value => () => {
        setTest('Obstacles', value)
        goToView(9)
    }

    doorClick = () => {
        setTest('Obstacles', 'Быстрый ответ')
    }

    componentDidMount() {
        reloadProgress(6 / 7)
    }

    render() {
        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="container">
                        <div className="row">
                            <div className="title col-12">
                                <TypingText text={`Что ${getUserCall() ? 'вам' : 'тебе'} мешает?`}/>
                            </div>
                            <div className="item-list row col-12">
                                <div className="item col-3 battery icon" onClick={this.click('Батарея')}/>
                                <div className="item col-3 time icon" onClick={this.click('Время')}/>
                                <div className="item col-3 routhine icon" onClick={this.click('Рутина')}/>
                                <div className="item col-3 books icon" onClick={this.click('Книги')}/>
                                <div className="item col-3 brain icon" onClick={this.click('Коммуникации')}/>
                                <div className="item col-3 ways icon" onClick={this.click('Пути')}/>
                                <div className="item col-3 clown icon" onClick={this.click('Клоун')}/>
                            </div>
                        </div>
                    </div>
                </Layout>
                <Door callback={this.doorClick}/>
            </Fragment>
        )
    }
}
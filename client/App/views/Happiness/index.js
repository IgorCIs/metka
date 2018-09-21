import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import TypingText from '../../components/TypingText'
import { getUserCall, reloadProgress, goToView, getTest, setTest } from '../../store'

export default class Happiness extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        error: false,
        nextText: false
    }

    click = value => () => {
        setTest('Happiness', value)
        if (value <= 8) goToView(7)
        else if (getTest('Wish') === 'да') {
            this.setState({error: true})
            setTimeout(() => {
                goToView(5)
            }, 3000)
        }
        else goToView(8)
    }

    componentDidMount() {
        reloadProgress(5 / 7)
    }

    render() {
        const { nextText, error } = this.state

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="title col-12">
                                    <TypingText
                                        text={`Оцени${getUserCall() ? 'те' : ''} уровень своего `}
                                        callback={this.setState.bind(this, {nextText: true})}
                                    />
                                    {nextText && <span className="gradient-text">
                                        <TypingText text="счастья"/>
                                    </span>}
                                </div>
                                <div className="number-list col-12 row">
                                    {[...new Array(10).keys()].map(value => (
                                        <div
                                            className="number"
                                            key={value}
                                        >
                                            <span onClick={this.click(value + 1)}>{value + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                {error && <div className="error" style={{position: 'absolute'}}>
                    <div className="title">
                        <TypingText text="Сбой системы"/>
                    </div>
                </div>}
            </Fragment>
        )
    }
}
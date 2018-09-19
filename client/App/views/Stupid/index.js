import React, { PureComponent } from 'react'

import Layout from '../../components/Layout'
import { goToView, getUserCall, reloadProgress, setTest } from '../../store'
import TypingText from '../../components/TypingText'

export default class Stupid extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    nextPageByValue = value => () => {
        setTest('Stupid', value)
        value <= 2 ? goToView(4) : goToView(5)
    }

    componentDidMount() {
        reloadProgress(3 / 7)
    }

    render() {
        return (
            <Layout className="w-100">
                <div className="wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="title col-12">
                                <TypingText text={`Оцени${getUserCall() ? 'те' : ''} уровень своей глупости`}/>
                            </div>
                            <div className="number-list col-12 row">
                                {[...new Array(10).keys()].map(value => (
                                    <div
                                        key={value}
                                        className="number col"
                                        onClick={this.nextPageByValue(value + 1)}
                                    >
                                        <span>{value + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
import React from 'react'

import Layout from '../../components/Layout'
import { goToView, getUserCall } from '../../store'
import TypingText from '../../components/TipingText'

const nextPageByValue = value => () => value <= 2 ? goToView(4) : goToView(5)

const Stupid = () => (
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
                                onClick={nextPageByValue(value + 1)}
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

export default Stupid
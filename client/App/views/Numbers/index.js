import React, { PureComponent, Fragment } from 'react'

import TypingText from '../../components/TypingText'
import Layout from '../../components/Layout'
import { reloadProgress, getUserCall, goToView, setTest } from '../../store'
import testTime from '../../components/testTime'

import animStyles from '../../components/AnimMounting/AnimWrapper.scss'

class Numbers extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        showWinView: false
    }

    componentDidMount() {
        reloadProgress(2 / 7)
    }

    click = value => () => {
        setTest('Numbers', value)
        this.setState({showWinView: true})
    }

    nextPage = () => {
        setTimeout(() => {
            goToView(3)
        }, 1000)
    }

    render() {
        const { showWinView } = this.state

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="container">
                        <div className="row">
                            <div className="title col-12">
                                <TypingText text={`Угадай${getUserCall() ? 'те' : ''} число от 1 до 10`} />
                            </div>
                            <div className="number-list col-12 row">
                                {[...new Array(10).keys()].map(value => (
                                    <div
                                        key={value}
                                        className="number"
                                        onClick={this.click(value + 1)}
                                    >
                                        <span>{value + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Layout>
                {showWinView && <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                    }}
                    className={[animStyles.animate, animStyles.slideUpBottom].join(' ')}
                    onAnimationEnd={this.nextPage}
                >
                    <Layout
                        type="gradient"
                        className="w-100"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="title col-12 capslock">
                                    <TypingText text={getUserCall() ? 'Вы угадали!' : 'Ты угадал!'}/>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>}
            </Fragment>
        )
    }
}

export default testTime(Numbers)
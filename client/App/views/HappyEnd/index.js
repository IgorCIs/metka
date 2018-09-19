import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import animStyles from '../../components/AnimMounting/AnimWrapper.scss'
import OnceAgain from '../../components/OnceAgain'

export default class HappyEnd extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        stage: 0
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({stage: 1})
        }, 2000)
    }

    render() {
        const { stage } = this.state

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="coin">
                                    <div className="coin-fliper">
                                        <div className="coin-front"/>
                                        <div className="coin-back"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                {stage === 1 && <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                    }}
                    className={[ animStyles.animate, animStyles.slideUpBottom].join(' ')}
                    onAnimationEnd={this.nextPage}
                >
                    <Layout
                        type="gradient"
                        className="w-100"
                    >
                        <div className="container relative h-100">
                            <div className="happy"/>
                            <OnceAgain viewBack={3}/>
                        </div>
                    </Layout>
                </div>}
            </Fragment>
        )
    }
}
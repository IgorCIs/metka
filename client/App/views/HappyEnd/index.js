import React, { PureComponent, Fragment } from 'react'

import Layout from '../../components/Layout'
import animStyles from '../../components/AnimMounting/AnimWrapper.scss'
import OnceAgain from '../../components/OnceAgain'

export default class HappyEnd extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        stage: 0,
        fill: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({stage: 1})
            setTimeout(() => {
                this.setState({stage: 2})
            }, 2000)
        }, 2000)
    }
    

    render() {
        const { stage } = this.state

        return (
            <Fragment>
                <Layout className="w-100">
                    <div className="wrapper">
                        <div className="loader">
                        </div>
                    </div>
                </Layout>
                {stage >= 1 && <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                    }}
                    className={[ animStyles.animate, animStyles.slideUpBottom].join(' ')}
                    onAnimationEnd={ this.nextPage }
                >
                    <Layout
                        type="gradient"
                        className="w-100 happwrap"
                    >
                        <div className="container relative h-100">
                            <div className="happy"/>
                            <OnceAgain viewBack={3}/>
                        </div>
                        {stage >= 2 && <div className='happyfill'></div>}

                    </Layout>
                </div>}
            </Fragment>
        )
    }
}
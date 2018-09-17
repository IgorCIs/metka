import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './AnimWrapper.scss'

class AnimWrapper extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static ANIMATION_TYPES = ['slideDownTop', 'slideUpTop', 'slideDownBottom', 'slideUpBottom', 'none']

    static propTypes = {
        animationType: PropTypes.oneOf(AnimWrapper.ANIMATION_TYPES).isRequired,
        mount: PropTypes.bool
    }

    static defaultProps = {
        mount: false
    }

    static getDerivedStateFromProps(props) {
        if (props.mount)
            return {
                show: true
            }
        return null
    }

    state = {
        show: false
    }

    animationEnd = () => {
        if (!this.props.mount)
            this.setState({show: false})
    }

    render() {
        const { children, animationType } = this.props
        const { show } = this.state

        const classNames = [
            styles.position,
            styles.animate,
            animationType !== 'none' ? styles[animationType] : undefined
        ].join(' ')

        return show ? (
            <div className={classNames} onAnimationEnd={this.animationEnd}>
                {children}
            </div>
        ) : null
    }
}

export default AnimWrapper
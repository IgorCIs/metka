import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class TypingText extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        callback: PropTypes.func
    }

    state = {
        viewedText: '',
    }

    timeout = null

    typing = () => {
        const { viewedText } = this.state
        const { text, callback } = this.props

        if (viewedText !== text)
            this.timeout = setTimeout(() => {
                const nextSymbol = text.replace(viewedText, '')[0]

                this.setState({viewedText: viewedText + nextSymbol})
                this.typing()
            }, 50 + Math.random() * 100)
        else if (callback) callback()
    }

    componentDidMount() {
        this.typing()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        const { viewedText } = this.state

        return viewedText
    }
}

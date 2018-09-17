import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class TypingText extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    state = {
        viewedText: '',
    }

    typing = () => {
        const { viewedText } = this.state
        const { text } = this.props

        if (viewedText !== text)
            setTimeout(() => {
                const nextSymbol = text.replace(viewedText, '')[0]

                this.setState({viewedText: viewedText + nextSymbol})
                this.typing()
            }, 50 + Math.random() * 100)
    }

    componentDidMount() {
        this.typing()
    }

    render() {
        const { viewedText } = this.state

        return viewedText
    }
}

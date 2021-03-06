import React, {Component} from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
        console.log('DatePickerLite error: %o, %o', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong in the DatePickerLite...</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePickerLite from '../src/DatePickerLite' //Modify this to 'datePickerLite/DatePickerLite'
import themeOverride from './themeOverride'

const startDate = '2018-05-11'
const endDate = '2018-05-16'
const allowedStartDate = '2018-05-04'
const allowedEndDate = '2018-05-22'

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '273px'
}

const buttonStyle = {
    cursor: 'pointer'
}

class DatePickerLiteDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    callback = ({
        stepForward,
        stepBackward
    }) => {
        this.setState({
            stepForward,
            stepBackward
        })
    }

    onChange = ({ month, selectedStartDate, selectedEndDate }) => {
        this.setState({ month })
    }

    stepBackward = (e) => this.state.stepBackward()
    stepForward = (e) => this.state.stepForward()

    render() {
        return (
            <div>
                <div style={ headerStyle }>
                    <span onClick={ this.stepBackward } style={ buttonStyle }>&lt;</span>
                    <span>{ this.state.month }</span>
                    <span onClick={ this.stepForward } style={ buttonStyle }>&gt;</span>
                </div>
                <DatePickerLite
                    selectedStartDate={startDate}
                    selectedEndDate={endDate}
                    allowedStartDate={allowedStartDate}
                    allowedEndDate={allowedEndDate}
                    onChange={ this.onChange}
                    callback={ this.callback}
                    theme={themeOverride}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <DatePickerLiteDemo/>,
    document.getElementById('app')
)

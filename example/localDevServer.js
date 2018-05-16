import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import DatePickerLite from '../src/DatePickerLite' //Modify this to 'datePickerLite/DatePickerLite'
import themeOverride from './themeOverride'

const startDate = '2018-05-11'
const endDate = '2018-05-16'
const allowedStartDate = '2018-05-04'
const allowedEndDate = '2018-05-22'
const onDatesChange = ({ startDate, endDate }) => {
    console.log('onDatesChange startDate: %o, endDate: %o', startDate, endDate);
}

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
            currentlyDisplayedMonth: () => {}
        }
    }
    callback = ({
        currentlyDisplayedMonth,
        stepForward,
        stepBackward
    }) => {
        this.setState({
            currentlyDisplayedMonth,
            stepForward,
            stepBackward,
            month: currentlyDisplayedMonth()
        })
    }

    stepBackward = (e) => {
        this.state.stepBackward()
        this.setState({ month: this.state.currentlyDisplayedMonth() })
    }
    stepForward = (e) => {
        this.state.stepForward()
        this.setState({ month: this.state.currentlyDisplayedMonth() })
    }

    render() {
        return (
            <div>
                <div style={ headerStyle }>
                    <span onClick={ this.stepBackward } style={ buttonStyle }>&lt;</span>
                    <span>Month: { this.state.month }</span>
                    <span onClick={ this.stepForward } style={ buttonStyle }>&gt;</span>
                </div>
                <DatePickerLite
                    startDate={startDate}
                    endDate={endDate}
                    allowedStartDate={allowedStartDate}
                    allowedEndDate={allowedEndDate}
                    onDatesChange={onDatesChange}
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

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

class DatePickerLiteDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: null
        }
        this.callback = this.callback.bind(this)
    }
    callback({
        currentlyDisplayedMonth,
        stepForward,
        stepBackward
    }) {
        this.setState({
            month: currentlyDisplayedMonth,
            stepForward,
            stepBackward
        })
    }
    stepForward() {}
    stepBackward() {}

    render() {
        return (
            <div>
                <div>
                    <span>&lt;</span>
                    <span>Month: { this.state.month }</span>
                    <span>&gt;</span>
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

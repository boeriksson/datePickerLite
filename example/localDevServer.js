import React from 'react'
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

const callback = ({
    currentlyDisplayedMonth,
    stepForward,
    stepBackward
}) => {
    console.log('callback currentlyDisplayedMonth: %o', currentlyDisplayedMonth);
    stepForward()
    stepBackward()
}

ReactDOM.render(
    <DatePickerLite
        startDate={ startDate }
        endDate={ endDate }
        allowedStartDate={ allowedStartDate }
        allowedEndDate={ allowedEndDate }
        onDatesChange={ onDatesChange }
        callback={ callback }
        theme={ themeOverride }
    />,
    document.getElementById('app')
)

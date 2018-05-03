import React from 'react'
import ReactDOM from 'react-dom'

import DatePickerLite from '../src/DatePickerLite' //Modify this to 'datePickerLite/DatePickerLite'
import themeOverride from './themeOverride'

const startDate = undefined
const endDate = undefined

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
        onDatesChange={ onDatesChange }
        callback={ callback }
        theme={ themeOverride }
    />,
    document.getElementById('app')
)

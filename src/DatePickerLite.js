import React from 'react'
import {LocalDateTime, ZonedDateTime} from 'js-joda'

import ErrorBoundary from './errorBoundary'

const DatePickerLite = () => {
    console.log("LocalDateTime: ", LocalDateTime.now().toString());
    console.log("ZonedDateTime: ", ZonedDateTime.parse('2016-02-26T09:42+01:00'));
    return (
        <ErrorBoundary>
            <div>LocalTime: </div>
        </ErrorBoundary>
    )
}

export default DatePickerLite

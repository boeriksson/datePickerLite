import React from 'react'
import Base from './Base'
import { ThemeProvider } from 'styled-components'

import merge from 'lodash/merge';

import ErrorBoundary from './errorBoundary'
import baseTheme from './themes/_common/index'

const DatePickerLite = (args) => {
    const theme = (args.hasOwnProperty('theme')) ?  merge(args.theme, baseTheme) : baseTheme
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <Base { ...args }/>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default DatePickerLite

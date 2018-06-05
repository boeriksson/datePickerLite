import React from 'react'
import Base from './Base'
import { ThemeProvider } from 'styled-components'

import merge from 'lodash/merge';

import ErrorBoundary from './errorBoundary'
import baseTheme from './themes/_common/index'
import defaultTheme from 'themes/default/index'

const DatePickerLite = (args) => {
    const theme = (args.hasOwnProperty('theme'))
        ?  merge(args.theme, baseTheme)
        : merge(defaultTheme, baseTheme)
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <Base { ...args }/>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default DatePickerLite

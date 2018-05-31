import React from 'react'
import Base from './Base'
import { ThemeProvider } from 'styled-components'

import merge from 'lodash/merge';

import ErrorBoundary from './errorBoundary'
import baseTheme from './themes/_common/index'
import defaultTheme from 'themes/default/index'

const deepMerge = (target, source) => {
    const isObject = item => item && typeof item === 'object' && !Array.isArray(item) && item !== null
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        });
    }
    return target;
}

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

import {
    format,
    getDate,
    getDay,
    getMonth,
    isEqual,
    isAfter,
    isBefore,
    startOfMonth,
    addDays,
    subDays,
    differenceInDays,
    addMonths,
    subMonths
} from 'date-fns'

export const parseWeekFromDay1 = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        return [f(addDays(startDate, dayNo)), ...(parseWeekFromDay1(startDate, dayNo + 1)(f) || [])]
    }
}

export const firstWeekDay = (day) => subDays(new Date(day), getDay(new Date(day)) - 1)

const parseWeekFromAnyDay = (day => parseWeekFromDay1(firstWeekDay(day)))

export const getWeekHeaders = (weekdays) => weekdays ? Object.values(weekdays) : [ 'mo', 'tu', 'we', 'th','fr', 'sa', 'su']

export const isWithinRange = (date, selectedStartDate, selectedEndDate) =>
    (selectedStartDate && selectedEndDate
        && (isAfter(date, selectedStartDate) || isEqual(date, selectedStartDate))
        && (isBefore(date, selectedEndDate) || isEqual(date, selectedEndDate)))
    || (selectedStartDate && isEqual(date, selectedStartDate))

export const isSelectable = (date, {allowedStartDate, allowedEndDate}) => (!allowedStartDate
    || (isEqual(date, allowedStartDate) || isAfter(date, allowedStartDate)))
    && (!allowedEndDate
        || (isEqual(date, allowedEndDate) || isBefore(date, allowedEndDate)))

export const getPreviousMonth = (monthNo) => monthNo === 0 ? 11 : monthNo - 1

export const populateMonthDisplay = (conf, monthNo = getMonth(new Date(conf.displayDate))) => {
    const firstWeekDayMonth = getMonth(startOfMonth(new Date(conf.displayDate)))
    if (firstWeekDayMonth === monthNo || firstWeekDayMonth === getPreviousMonth(monthNo)) {
        return [
            parseWeekFromAnyDay(conf.displayDate)((date) => {
                const inMonth = getMonth(new Date(date)) === monthNo
                return {
                    date,
                    dayNo: getDate(date),
                    inMonth,
                    unselectable: !isSelectable(date, conf),
                    selected: inMonth && isWithinRange(date, conf.selectedStartDate, conf.selectedEndDate),
                    selectedEdge: inMonth && ((conf.selectedStartDate && isEqual(date, conf.selectedStartDate))
                        || (conf.selectedEndDate && isEqual(date, conf.selectedEndDate)))
                }
            }),
            ...populateMonthDisplay({
                ...conf,
                displayDate: addDays(conf.displayDate, 7),
            }, monthNo)
        ]
    } else {
        return []
    }
}

const getDisplayDate = ({displayDate, selectedStartDate, selectedEndDate}) => {
    if (displayDate) return displayDate
    const nowDate = format(new Date(), 'YYYY-MM-DD')
    if (!selectedStartDate) return nowDate
    return differenceInDays(new Date(nowDate), new Date(selectedStartDate))
        < differenceInDays(new Date(nowDate), new Date(selectedEndDate))
        ? selectedStartDate : selectedEndDate
}

export const getFirstDayOfMonth = (date) => format(subDays(date, getDate(date) - 1), 'YYYY-MM-DD')

export const getModelByDate = (config = {}) => {
    config.displayDate = getFirstDayOfMonth(getDisplayDate(config))
    const weekHeaders = getWeekHeaders(config.weekdays)
    const monthDisplay = populateMonthDisplay(config)
    return {weekHeaders, monthDisplay, config}
}

export const getCurrentlyDisplayedMonth = (config = {}) => getDisplayDate(config)

export const stepForward = (config) => getModelByDate({
    ...config,
    displayDate: addMonths(new Date(config.displayDate), 1)
})

export const stepBackward = (config) => getModelByDate({
    ...config,
    displayDate: subMonths(new Date(config.displayDate), 1)
})

export const goToNow = (config) => getModelByDate({
    ...config,
    displayDate: format(new Date(), 'YYYY-MM-DD')
})

const dateToString = (date) => date ? format(date, 'YYYY-MM-DD') : date

export const dayClicked = (day, config) => {
    let {selectedStartDate, selectedEndDate} = config
    const date = day.date

    console.log('dayClicked day: %o, config: %o', day, config);

    if (!selectedStartDate) {
        selectedStartDate = date
    } else if (selectedStartDate && !selectedEndDate && isBefore(date, selectedStartDate)) {
        selectedEndDate = selectedStartDate
        selectedStartDate = date
    } else if (selectedStartDate && !selectedEndDate && isAfter(date, selectedStartDate)) {
        selectedEndDate = date
    } else if (selectedStartDate && selectedEndDate && isBefore(date, selectedStartDate)) {
        selectedStartDate = date
    } else if (selectedStartDate && selectedEndDate && isAfter(date, selectedEndDate)) {
        selectedEndDate = date
    } else if (selectedStartDate && selectedEndDate
        && (isAfter(date, selectedStartDate) || isEqual(date, selectedStartDate))
        && (isBefore(date, selectedEndDate) || isEqual(date, selectedEndDate))) {
        selectedStartDate = undefined
        selectedEndDate = undefined
    }
    const weekHeaders = getWeekHeaders(config.weekdays)

    console.log('config after: ', config);
    const monthDisplay = populateMonthDisplay({
        ...config,
        selectedStartDate,
        selectedEndDate
    })

    return {weekHeaders, monthDisplay, config: {
        ...config, selectedStartDate: dateToString(selectedStartDate), selectedEndDate: dateToString(selectedEndDate)}}
}

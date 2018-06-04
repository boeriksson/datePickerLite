import { format, getDate, getMonth, isEqual, isAfter, isBefore, startOfMonth, addDays } from 'date-fns'

export const parseWeekFromDay1 = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        return [f(startDate.plusDays(dayNo)), ...(parseWeekFromDay1(startDate, dayNo + 1)(f) || [])]
    }
}

export const firstWeekDay = (day) => day.minusDays(day.dayOfWeek().value() - 1)

const parseWeekFromAnyDay = (day => parseWeekFromDay1(firstWeekDay(day)))

const getWeekHeaders = (weekdays) => weekdays ? weekdays.values() : [ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

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
    const nowDate = LocalDate.now()
    if (!selectedStartDate) return nowDate
    return nowDate.until(selectedStartDate, ChronoUnit.DAYS) < nowDate.until(selectedEndDate, ChronoUnit.DAYS)
        ? selectedStartDate : selectedEndDate
}

const getFirstDayOfMonth = (date) => date.minusDays(date.dayOfMonth() - 1)

const parseConfigToJoda = (config) => {
    const conf = {
        displayDate: config.displayDate ? LocalDate.parse(config.displayDate) : undefined,
        selectedStartDate: config.selectedStartDate ? LocalDate.parse(config.selectedStartDate) : undefined,
        selectedEndDate: config.selectedEndDate ? LocalDate.parse(config.selectedEndDate) : undefined,
        allowedStartDate: config.allowedStartDate ? LocalDate.parse(config.allowedStartDate) : undefined,
        allowedEndDate: config.allowedEndDate ? LocalDate.parse(config.allowedEndDate) : undefined,
        weekdays: config.weekdays
    }
    conf.displayDate = getFirstDayOfMonth(getDisplayDate(conf))
    return conf
}

const parseConfigToText = ({
                               displayDate,
                               selectedStartDate,
                               selectedEndDate,
                               allowedStartDate,
                               allowedEndDate,
                               weekdays
                           }) => ({
    displayDate: displayDate && displayDate.toString(),
    selectedStartDate: selectedStartDate && selectedStartDate.toString(),
    selectedEndDate: selectedEndDate && selectedEndDate.toString(),
    allowedStartDate: allowedStartDate && allowedStartDate.toString(),
    allowedEndDate: allowedEndDate && allowedEndDate.toString(),
    weekdays
})

export const getModelByDate = (config = {}) => {
    const weekHeaders = getWeekHeaders(config.weekdays)
    const monthDisplay = populateMonthDisplay(config)
    return {weekHeaders, monthDisplay, config}
}

export const getCurrentlyDisplayedMonth = (config = {}) => getDisplayDate(parseConfigToJoda(config)).toString()

export const stepForward = (config) => getModelByDate({
    ...config,
    displayDate: LocalDate.parse(config.displayDate).plusMonths(1).toString()
})

export const stepBackward = (config) => getModelByDate({
    ...config,
    displayDate: LocalDate.parse(config.displayDate).minusMonths(1).toString()
})

export const goToNow = (config) => getModelByDate({
    ...config,
    displayDate: LocalDate.now().toString()
})

export const dayClicked = (day, config) => {
    let conf = parseConfigToJoda(config)
    let {selectedStartDate, selectedEndDate, displayDate} = conf
    const date = LocalDate.parse(day.date)

    if (!selectedStartDate) {
        selectedStartDate = date
    } else if (selectedStartDate && !selectedEndDate && date.isBefore(selectedStartDate)) {
        selectedEndDate = selectedStartDate
        selectedStartDate = date
    } else if (selectedStartDate && !selectedEndDate && date.isAfter(selectedStartDate)) {
        selectedEndDate = date
    } else if (selectedStartDate && selectedEndDate && date.isBefore(selectedStartDate)) {
        selectedStartDate = date
    } else if (selectedStartDate && selectedEndDate && date.isAfter(selectedEndDate)) {
        selectedEndDate = date
    } else if (selectedStartDate && selectedEndDate
        && (date.isAfter(selectedStartDate) || date.isEqual(selectedStartDate))
        && (date.isBefore(selectedEndDate) || date.isEqual(selectedEndDate))) {
        selectedStartDate = undefined
        selectedEndDate = undefined
    }
    conf = {...conf, selectedStartDate, selectedEndDate}
    const weekHeaders = getWeekHeaders(displayDate, conf.weekdays)
    const monthDisplay = populateMonthDisplay(conf)

    return {weekHeaders, monthDisplay, config: parseConfigToText(conf)}
}

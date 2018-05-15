import { LocalDate, ChronoUnit } from 'js-joda'

export const parseWeekFromDay1 = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        return [ f(startDate.plusDays(dayNo)), ...(parseWeekFromDay1(startDate, dayNo + 1)(f) || []) ]
    }
}

export const firstWeekDay = (day) => day.minusDays(day.dayOfWeek().value() - 1)

const parseWeekFromAnyDay =(day => parseWeekFromDay1(firstWeekDay(day)))

const getWeekHeaders = day => parseWeekFromAnyDay(day)((date) => date.dayOfWeek().toString().toLowerCase().substr(0, 2))

export const isWithinRange = (date, startDate, endDate) => startDate && endDate
    && (date.isAfter(startDate) || date.isEqual(startDate)) && (date.isBefore(endDate) || date.isEqual(endDate))

export const isSelectable = (date, { allowedStartDate, allowedEndDate}) => (!allowedStartDate
    || (date.isEqual(allowedStartDate) || date.isAfter(allowedStartDate)))
    && (!allowedEndDate
    || (date.isEqual(allowedEndDate) || date.isBefore(allowedEndDate)))

export const populateMonthDisplay = (conf, monthNo = conf.displayDate.month().value()) => {
    if (firstWeekDay(conf.displayDate).month().value() <= monthNo) {
        return [
            parseWeekFromAnyDay(conf.displayDate)((date) => ({
                dayNo: date.dayOfMonth(),
                inMonth: date.month().value() === monthNo,
                unselectable: !isSelectable(date, conf),
                selected: isWithinRange(date, conf.selectedStartDate, conf.selectedEndDate),
                selectedEdge: conf.selectedStartDate && conf.selectedEndDate
                    && (date.isEqual(conf.selectedStartDate) || date.isEqual(conf.selectedEndDate))
            })),
            ...populateMonthDisplay({
                ...conf,
                displayDate: conf.displayDate.plusDays(7),
            }, monthNo)
        ]
    } else {
        return []
    }
}

const getDisplayDate = ({ displayDate, selectedStartDate, selectedEndDate }) => {
    if (displayDate) return displayDate
    const nowDate = LocalDate.now()
    if (!selectedStartDate) return nowDate
    return nowDate.until(selectedStartDate, ChronoUnit.DAYS) < nowDate.until(selectedEndDate, ChronoUnit.DAYS)
        ? selectedStartDate : selectedEndDate
}

const getFirstDayOfMonth = (date) => date.minusDays(date.dayOfMonth() - 1)

export const getModelByDate = (config = {}) => {
    const conf = {
        displayDate: config.displayDate ? LocalDate.parse(config.displayDate): undefined,
        selectedStartDate: config.selectedStartDate ? LocalDate.parse(config.selectedStartDate): undefined,
        selectedEndDate: config.selectedEndDate ? LocalDate.parse(config.selectedEndDate): undefined,
        allowedStartDate: config.allowedStartDate ? LocalDate.parse(config.allowedStartDate): undefined,
        allowedEndDate: config.allowedEndDate ? LocalDate.parse(config.allowedEndDate): undefined
    }
    conf.displayDate = getFirstDayOfMonth(getDisplayDate(conf))
    const weekHeaders = getWeekHeaders(conf.displayDate)
    const monthDisplay = populateMonthDisplay(conf)
    console.log('monthDisplay: ', monthDisplay)

    return { weekHeaders, monthDisplay }
}

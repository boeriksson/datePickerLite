import { LocalDate } from 'js-joda'

const parseWeekFromDay1 = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        return [ f(startDate.plusDays(dayNo)), ...(parseWeekFromDay1(startDate, dayNo + 1)(f) || []) ]
    }
}

const firstWeekDay = (day) => day.minusDays(day.dayOfWeek().value() - 1)

const parseWeekFromAnyDay =(day => parseWeekFromDay1(firstWeekDay(day)))

const getWeekHeaders = day => parseWeekFromAnyDay(day)((date) => date.dayOfWeek().toString().toLowerCase().substr(0, 2))

const populateMonthDisplay = (conf, monthNo = conf.displayDate.month().value()) => {
    if (firstWeekDay(conf.displayDate).month().value() <= monthNo) {
        return [
            parseWeekFromAnyDay(conf.displayDate)((date) => ({
                dayNo: date.dayOfMonth(),
                inMonth: date.month().value() === monthNo,
                allowed: (conf.allowedStartDate ? date.isAfter(conf.allowedStartDate) : true)
                    && (conf.allowedEndDate ? date.isBefore(conf.allowedEndDate) : true)
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

const getDisplayDate = ({ displayDate = LocalDate.now() }) => displayDate.minusDays(displayDate.dayOfMonth() - 1)

export const getModelByDate = (config = {}) => {
    // config: { startDate, selectedStartDate, selectedEndDate, allowedStartDate, allowedEndDate }
    //check if dateStr is str, or localdate and then base model on that
    //else use today

    //get first day of month and set that as startdate in config
    //const startDate = startDate.minusDays(startDate.dayOfMonth() - 1)

    const conf = {
        displayDate: getDisplayDate(config), // Date in month to display - change to first day of month..
        selectedStartDate: config.selectedStartDate, // If selection, this is the startdate
        selectedEndDate: config.selectedEndDate, // If selection, enddate
        allowedStartDate: config.allowedStartDate, // If allowedrange, this is startdate
        allowedEndDate: config.allowedEndDate // allowedrange enddate
    }

    //create array and add dayHeaders
    const weekHeaders = getWeekHeaders(conf.displayDate);

    //create array and add weeks until last day of month has passed
    //  create array and add weekdays for each week.
    const monthDisplay = populateMonthDisplay(conf)
    console.log('monthDisplay: ', monthDisplay);

    return { weekHeaders, monthDisplay }
}

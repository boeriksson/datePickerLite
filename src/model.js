import { LocalDate } from 'js-joda'

const parseWeekFromDay1 = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        return [ f(startDate.plusDays(dayNo)), ...(parseWeekFromDay1(startDate, dayNo + 1)(f) || []) ]
    }
}

const parseWeekFromAnyDay =(day => parseWeekFromDay1(day.minusDays(day.dayOfWeek().value() - 1)))

const getWeekHeaders = day => parseWeekFromAnyDay(day)((date) => date.dayOfWeek().toString().toLowerCase().substr(0, 2))

const populateMonthDisplay2 = (day, monthNo = day.month().value()) => {
    console.log('3: ', day.minusDays(day.dayOfWeek().value() - 1).month().value())
    console.log('monthNo: ', monthNo)
    if (day.minusDays(day.dayOfWeek().value() - 1).month().value() <= monthNo) {
        return [
            parseWeekFromAnyDay(day)((date) => ({
                dayNo: date.dayOfMonth()
            })),
            ...populateMonthDisplay2(day.plusDays(7), monthNo)
        ]
    }
}

const populateMonthDisplay = (firstDayOfMonth) => {
    const monthArray = []
    let day = firstDayOfMonth
    const month = firstDayOfMonth.month()
    while (day.month() === month) {
        const week = parseWeekFromAnyDay(day)((date) => ({
            dayNo: date.dayOfMonth()
        }))
        monthArray.push(week)
        day = day.plusDays(7)
    }
    return monthArray;
}


export const getModelByDate = (dateStr) => {
    //check if dateStr is str, or localdate and then base model on that
    //else use today
    const date = LocalDate.now()

    //get first day of month
    const firstDayOfMonth = date.minusDays(date.dayOfMonth() - 1)

    //get last day of month
    //const lastDayOfMonth = date.plusDays(date.lengthOfMonth() - date.dayOfMonth())

    //create array and add dayHeaders
    const weekHeaders = getWeekHeaders(firstDayOfMonth);

    //create array and add weeks until last day of month has passed
    //  create array and add weekdays for each week.
    const monthDisplay = populateMonthDisplay2(firstDayOfMonth)

    return { weekHeaders, monthDisplay }
}

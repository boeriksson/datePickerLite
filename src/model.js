import { LocalDate } from 'js-joda'

const forEachWeekDay = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        f(startDate.plusDays(dayNo))
        forEachWeekDay(startDate, dayNo + 1)(f)
    }
}

const getWeekHeaders = firstDayOfFirstWeek => {
    const weekHeaders = []
    forEachWeekDay(firstDayOfFirstWeek)((date) =>
        weekHeaders.push(date.dayOfWeek().toString().toLowerCase().substr(0, 2)))
    return weekHeaders
}

export const getModelByDate = (dateStr) => {
    //check if dateStr is str, or localdate and then base model on that
    //else use today
    const date = LocalDate.now();

    //get first day of month
    const firstDayOfMonth = date.minusDays(date.dayOfMonth().value() - 1)

    //  get first day of week that day is in
    const firstDayOfFirstWeek = firstDayOfMonth.minusDays(firstDayOfMonth.dayOfWeek().value() - 1)

    //get last day of month
    const lastDayOfMonth = date.plusDays(date.lengthOfMonth() - date.dayOfMonth())

    //create array and add dayHeaders
    const weekHeaders = getWeekHeaders(firstDayOfFirstWeek);

    //create array and add weeks until last day of month has passed
    //  create array and add weekdays for each week.

    return { weekDayHeaders, monthArray }
}

const j = require('../node_modules/js-joda')


const d = j.LocalDate.parse('2016-12-24');
console.log('d: ', d.toString());

console.log(j.LocalDateTime.parse('2016-02-26T09:42').toString());

console.log(j.ZonedDateTime.parse('2016-02-26T09:42+01:00').toString());
console.log(j.ZonedDateTime.parse('2016-03-18T11:38:23.561Z').toString());

console.log(j.ZonedDateTime.parse('2016-02-26T09:42+01:00')._dateTime.toString());

const dt = j.LocalDateTime.parse('2016-02-26T09:42')

console.log('dt: ', dt.toString());
console.log('Month: ', dt.month().toString());
console.log('dayOfMonth: ', dt.dayOfMonth());
console.log('dayOfWeek: ', dt.dayOfWeek().toString());
console.log('dayOfWeek no: ', dt.dayOfWeek().value());

const fdw = dt.minusDays(dt.dayOfWeek().value() - 1)
console.log('firstDayOfWeek date: ', fdw.toString() );
console.log('firstDayOfWeek weekday: ', fdw.dayOfWeek().toString() );

const now = j.LocalDate.now();
console.log('now: ', now.toString());
const lastDayOfMonth = now.plusDays(now.lengthOfMonth() - now.dayOfMonth())
console.log('lastDayOfMonth: ', lastDayOfMonth.toString())

console.log('-------------------------forEachWeekDay: ');
console.log(' ');
const forEachWeekDay = (startDate, dayNo = 0) => f => {
    if (dayNo < 7) {
        f(startDate.plusDays(dayNo))
        forEachWeekDay(startDate, dayNo + 1)(f)
    }
}

forEachWeekDay(now)((date) => console.log('date: ', date.dayOfWeek().toString().toLowerCase().substr(0, 2)))


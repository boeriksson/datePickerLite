const j = require('../node_modules/js-joda')


const d = j.LocalDate.parse('2016-12-24');
console.log('d: ', d.toString());

console.log(j.LocalDateTime.parse('2016-02-26T09:42').toString());

console.log(j.ZonedDateTime.parse('2016-02-26T09:42+01:00').toString());
console.log(j.ZonedDateTime.parse('2016-03-18T11:38:23.561Z').toString());

console.log(j.ZonedDateTime.parse('2016-02-26T09:42+01:00')._dateTime.toString());

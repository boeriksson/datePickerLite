const fns = require('date-fns')

const d1 = new Date(2018, 5, 4)
const d2 = new Date(2018, 4, 20)
console.log('d1: %s, d2: %s ', fns.format(d1, 'YYYY-MM-DD'), fns.format(d2));

console.log('sub 5: ', fns.subDays(d1, 5))
console.log('plus 5: ', fns.addDays(d1, 5))

console.log('d2 is after d1: ', fns.isAfter(d1, d2));
console.log('d2 is before d1: ', fns.isBefore(d1, d2));

console.log('d2 isEqual to d2', fns.isEqual(d2, d2));

const d3 = new Date('2018-06-02')
console.log('d3: ', fns.format(d3));

console.log('d3 month: ', fns.getMonth(d3));
console.log('d3 first day of month', fns.startOfMonth(d3));

const d4 = '2018-07-03'
console.log('dayofmonth: ', fns.getDate(d4));

console.log('format date: ', fns.format(new Date('2018-06-04')));

const d5a = '2018-07-03'
const d5b = new Date(d5a)
console.log('isDate 2018-07-03: ', fns.isDate(d5a))
console.log('isDate date: ', fns.isDate(d5b))

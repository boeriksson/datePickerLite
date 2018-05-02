#DatePickerLite

React component that visualize dates which can be picked to create a single date or a daterange.

Uses https://github.com/js-joda/js-joda (The whole point of this is to create a more lightweight component that similar that uses moment)

Dates should be in a local dateTimeFormat ('YYYY-MM-DDTHH:MM')

Useage: 

`<DatePickerLite
   startDate={ startDate }
   endDate={ endDate }
   onDatesChange={ function({ startDate, endDate }) }
   navPrev={ <ArrowLeft/> }
   navNext={ <ArrowRight/> }
/>`

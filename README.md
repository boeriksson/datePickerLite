#DatePickerLite

React component that visualize dates which can be picked to create a single date or a daterange.

Uses https://github.com/js-joda/js-joda (The whole point of this is to create a more lightweight component that similar that uses moment)

Dates should be in a local dateTimeFormat ('YYYY-MM-DDTHH:MM')

Usage:

```
<DatePickerLite
   startDate={ startDate }
   endDate={ endDate }
   onDatesChange={ function({ startDate, endDate }) }
   callback={ function() // function that will be called on componentDidMount() and return the following object:
        {
            currentlyDisplayedMonth, //String: 'YYYY:MM'
            stepForward, //function - change display to one month forward
            stepBackward, //function - backwards
        }
   }
/>
```

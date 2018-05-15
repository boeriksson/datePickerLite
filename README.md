#DatePickerLite

The ambition is to create a superslim datepicker-component that is easily stylable for react projects running styled-components.

React component that visualize dates which can be picked to create a single date or a daterange.
Uses https://github.com/js-joda/js-joda

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

**startDate** - optional
Defines the beginning of a selected range (or single date)
if this is omitted nothing is preselected

Also, the starting month of the calender will be the one with startDate or endDate, whichever is closer to **now**
Without startDate, the current month will be displayed

**endDate** - optional
Defines the end of the selected range

**onDatesChange**
Defines a callback function returning some utillity functions:

*currentlyDisplayedMonth()* - returns a string in the format 'YYYY:MM'<br>
*stepForward()* - invoking this steps one month forward<br>
*stepBackward()* - invoking this steps one month backwards





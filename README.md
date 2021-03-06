DatePickerLite
==============

React component that visualize dates which can be picked to create a single date or a daterange.
Uses https://github.com/js-joda/js-joda OR https://github.com/date-fns/date-fns a peer dependency

The ambition is to create a superslim datepicker-component that is easily stylable for react projects running styled-components.
It is very barebones and just handles the view of a month, but can easily be extended with controls and styled to fit the application

![default theme](https://github.com/boeriksson/datePickerLite/blob/master/img/datepicker.PNG)

Dates should be in a local dateFormat ('YYYY-MM-DD')

Usage:

```
<DatePickerLite
   selectedStartDate={startDate}
   selectedEndDate={endDate}
   allowedStartDate={allowedStartDate}
   allowedEndDate={allowedEndDate}
   onChange={ function({ month, selectedStartDate, selectedEndDate }) }
   callback={ function() // function that will be called on componentDidMount() and return the following object:
        {
            stepForward, //function - change display to one month forward
            stepBackward, //function - backwards
        }
   }
   theme={themeOverride}
/>
```

**selectedStartDate** - optional
Defines the beginning of a selected range (or single date)
If this is omitted nothing is preselected.

Also, the starting month of the calender will be the one with startDate or endDate, whichever is closer to **now**
Without startDate, the current month will be displayed

**selectedEndDate** - optional
Defines the end of the selected range.

**allowedStartDate** - optional
Defines a date, before which, dates are not selectable.

**allowedEndDate** - optional
Defines a date, after which, dates are not selectable.

**onChange**
The "onChange" property should be supplied a function that will receive information about the current state of the datepicker.
It will be called with an object containing: { month, selectedStartDate, selectedEndDate }

**callback**
Defines a callback function returning some utillity functions:

*stepForward()* - invoking this steps one month forward<br>
*stepBackward()* - invoking this steps one month backwards

**theme**
This parameter takes a "theme" that will be merged with (and override) DatePickerLite's default theme. Easiest way to get a grasp of how to do this is to look at *localDevServer.js* in the example folder, where a "blueTheme" is imported and supplied to the component.

Without theme attribute: <br>
![default theme](https://github.com/boeriksson/datePickerLite/blob/master/img/defaultTheme.PNG)

With the "blueTheme" resp "greenTheme" imported in the example/localDevServer.js: <br>
![default theme](https://github.com/boeriksson/datePickerLite/blob/master/img/blueTheme.PNG)
![default theme](https://github.com/boeriksson/datePickerLite/blob/master/img/greenTheme.PNG)

The whole component consists of divs with display:table and can be overridden by copying an example theme and applying styles. Base styles to change/override are found in /src/themes/_common/skins/Base.js.

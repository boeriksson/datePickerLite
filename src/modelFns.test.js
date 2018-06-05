import {
    firstWeekDay,
    isSelectable,
    isWithinRange,
    parseWeekFromDay1,
    populateMonthDisplay,
    dayClicked,
    getWeekHeaders,
    getFirstDayOfMonth
} from './modelFns'

import {
    isMonday,
    format,
    getDay,
    addDays,
    subDays
} from 'date-fns'

describe('#firstWeekDay', () => {
    test('should return a monday in same week if given a thursday', () => {
        const givenDay = '2018-05-17'
        expect(isMonday(new Date(firstWeekDay(givenDay)))).toBe(true)
    })
})

describe('#parseWeekFromDay1', () => {
    test('should return an array result of a supplied function', () => {
        const startDate = '2018-05-07'
        const expectedResult = [
            '2018-05-07',
            '2018-05-08',
            '2018-05-09',
            '2018-05-10',
            '2018-05-11',
            '2018-05-12',
            '2018-05-13'
        ]
        const result = parseWeekFromDay1(startDate)((date) => format(date, 'YYYY-MM-DD'))
        expect(result).toEqual(expectedResult)
    })
})

describe('#getWeekHeaders', () => {
    const weekdays = {
        MONDAY: 'MÅNDAG',
        TUESDAY: 'TISDAG',
        WEDNESDAY: 'ONSDAG',
        THURSDAY: 'TORSDAG',
        FRIDAY: 'FREDAG',
        SATURDAY: 'LÖRDAG',
        SUNDAY: 'SÖNDAG'
    }
    test('should return correct weekheaders with input', () => {
        expect(getWeekHeaders(weekdays).sort())
            .toEqual(['MÅNDAG', 'TISDAG', 'ONSDAG', 'TORSDAG', 'FREDAG', 'LÖRDAG', 'SÖNDAG'].sort())
    })

    test('should return default day if no "weekdays" is supplied', () => {
        expect(getWeekHeaders().sort()).toEqual([ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].sort())
    })
})

describe('#isSelectable', () => {
    let conf = {}
    beforeEach(() => {
        conf.displayDate = '2018-05-01'
        conf.selectedStartDate = undefined
        conf.selectedEndDate = undefined
        conf.allowedStartDate = undefined
        conf.allowedEndDate = undefined
    })
    afterEach(() => {
        conf = {}
    })

    test('should be selectable if no allowedRange set', () => {
        expect(isSelectable('2018-05-11', conf)).toBe(true)
    })

    test('should be isSelectable = true, if only allowedStartDate is set and date is same', () => {
        const aDate = '2018-05-11'
        conf.allowedStartDate = aDate
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if only allowedStartDate is set and date is before', () => {
        const aDate = '2018-05-11'
        conf.allowedStartDate = addDays(aDate, 3)
        expect(isSelectable(aDate, conf)).toBe(false)
    })

    test('should be isSelectable = true, if only allowedStartDate is set and date is after', () => {
        const aDate = '2018-05-11'
        conf.allowedStartDate = subDays(aDate, 3)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = true, if only allowedEndDate is set and date is before', () => {
        const aDate = '2018-05-11'
        conf.allowedEndDate = addDays(aDate, 2)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if only allowedEndDate is set and date is after', () => {
        const aDate = '2018-05-11'
        conf.allowedEndDate = subDays(aDate, 2)
        expect(isSelectable(aDate, conf)).toBe(false)
    })

    test('should be isSelectable = true, if allowedEndDate & allowedStartDate & date is within', () => {
        const aDate = '2018-05-11'
        conf.allowedEndDate = addDays(aDate, 2)
        conf.allowedStartDate = subDays(aDate, 10)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if allowedEndDate & allowedStartDate & date is outside', () => {
        const aDate = '2018-05-11'
        conf.allowedEndDate = subDays(aDate, 2)
        conf.allowedStartDate = subDays(aDate, 10)
        expect(isSelectable(aDate, conf)).toBe(false)
    })
})

describe('#isWithinRange', () => {
    let selectedStartDate
    let selectedEndDate

    test('should return true if date is same as selectedStartDate/selectedEndDate or inbetween', () => {
        selectedStartDate = '2018-05-10'
        selectedEndDate = '2018-05-20'
        expect(isWithinRange('2018-05-10', selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange('2018-05-20', selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange('2018-05-11', selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange('2018-05-08', selectedStartDate, selectedEndDate)).toBe(false)
    })
    test('should return true if date is same as selectedStartDate, even though selectedEndDate is undefined', () => {
        selectedStartDate = '2018-05-10'
        selectedEndDate = undefined
        expect(isWithinRange('2018-05-10', selectedStartDate, selectedEndDate)).toBe(true)
    })
    test('should return false if date is not same as selectedStartDate, when selectedEndDate is undefined', () => {
        selectedStartDate = '2018-05-10'
        selectedEndDate = undefined
        expect(isWithinRange('2018-05-11', selectedStartDate, selectedEndDate)).toBe(false)
    })
})

describe('#populateMonthDisplay', () => {
    let conf = {}
    beforeEach(() => {
        conf.displayDate = '2018-05-01'
        conf.selectedStartDate = undefined
        conf.selectedEndDate = undefined
        conf.allowedStartDate = undefined
        conf.allowedEndDate = undefined
    })

    afterEach(() => {
        conf = {}
    })

    test('last entry in first array returned should have property "inMonth: true"', () => {
        expect(populateMonthDisplay(conf)[0][6].inMonth).toBe(true)
    })

    test('entry in allowedRange should have "unselectable: false"', () => {
        conf.allowedStartDate = '2017-05-01'
        conf.allowedEndDate = '2018-05-11'
        expect(populateMonthDisplay(conf)[0][0].unselectable).toBe(false)
    })

    test('entry outside of allowedrange should have "unselectable: true"', () => {
        conf.allowedStartDate = '2017-05-01'
        conf.allowedEndDate = '2017-05-11'
        expect(populateMonthDisplay(conf)[0][0].unselectable).toBe(true)
    })

    describe('selectedRange', () => {
        beforeEach(() => {
            conf.selectedStartDate = '2018-05-01'
            conf.selectedEndDate = '2018-05-11'
        })
        test('entry in selectedrange should have "selected: true"', () => {
            expect(populateMonthDisplay(conf)[1][0].selected).toBe(true)
        })
        test('entry outside selectedrange should have "selected: false"', () => {
            const endOfSelectedRange = populateMonthDisplay(conf)[1][4]
            expect(endOfSelectedRange.selected).toBe(true)
            expect(endOfSelectedRange.selectedEdge).toBe(true)
        })
    })
})

describe('#dayClicked', () => {
    let config = {}
    let day = {}
    beforeEach(() => {
        config.displayDate = '2018-05-01'
        config.selectedStartDate = '2018-05-11'
        config.selectedEndDate = '2018-05-16'
        config.allowedStartDate = '2018-05-04'
        config.allowedEndDate = '2018-05-23'
        day.date = '2018-05-17'
        day.dayNo = 17
        day.inMonth = true
        day.unselectable = false
        day.selected = false
        day.selectedEdge = false
    })

    test('should set selectedStartDate to day if clicked and no selection', () => {
        config.selectedStartDate = undefined
        config.selectedEndDate = undefined
        day.date = '2018-05-10'
        day.dayNo = 10
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: '2018-05-10'
        })
    })
    test('should set selectedStartDate to day & old Start to End if Start but no End, and day is before', () => {
        config.selectedStartDate = '2018-05-18'
        config.selectedEndDate = undefined
        day.date = '2018-05-10'
        day.dayNo = 10
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: '2018-05-10',
            selectedEndDate: '2018-05-18'
        })
    })
    test('should set selectedEndDate if Start but no End, and day is after', () => {
        config.selectedStartDate = '2018-05-05'
        config.selectedEndDate = undefined
        day.date = '2018-05-10'
        day.dayNo = 10
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: '2018-05-05',
            selectedEndDate: '2018-05-10'
        })
    })
    test('should set selectedStartDate to day if clicked before selection', () => {
        config.selectedStartDate = '2018-05-18'
        config.selectedEndDate = '2018-05-20'
        day.date = '2018-05-10'
        day.dayNo = 10
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: '2018-05-10',
            selectedEndDate: '2018-05-20'
        })
    })
    test('should set selectedEndDate to day if clicked after selection', () => {
        config.selectedStartDate = '2018-05-10'
        config.selectedEndDate = '2018-05-12'
        day.date = '2018-05-17'
        day.dayNo = 17
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: '2018-05-10',
            selectedEndDate: '2018-05-17'
        })
    })
    test('should set selectedStartDate/selectedEndDate to undefined if day is in selection', () => {
        config.selectedStartDate = '2018-05-10'
        config.selectedEndDate = '2018-05-20'
        day.date = '2018-05-17'
        day.dayNo = 17
        expect(dayClicked(day, config).config).toEqual({
            ...config,
            selectedStartDate: undefined,
            selectedEndDate: undefined
        })
    })
})

describe('#getFirstDayOfMonth', () => {
    test('should return the first day of given month', () => {
        const date = '2018-06-05'
        expect(getFirstDayOfMonth(date)).toBe('2018-06-01')
    })
})

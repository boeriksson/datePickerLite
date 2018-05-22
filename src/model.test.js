import { LocalDate } from 'js-joda'

import {
    firstWeekDay,
    isSelectable,
    isWithinRange,
    parseWeekFromDay1,
    populateMonthDisplay,
    dayClicked,
    getLocalizedWeekday
} from './model'


describe('#firstWeekDay', () => {
    test('should return a monday in same week if given a thursday', () => {
        const givenDay = LocalDate.parse('2018-05-11')
        expect(firstWeekDay(givenDay).dayOfWeek().toString()).toBe('MONDAY')
    })
})

describe('#parseWeekFromDay1', () => {
    test('should return an array result of a supplied function', () => {
        const startDate = LocalDate.parse('2018-05-07')
        const expectedResult = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']
        const result = parseWeekFromDay1(startDate)((date) => date.dayOfWeek().toString())
        expect(result).toEqual(expectedResult)
    })
})

describe('#getLocalizedWeekday', () => {
    const weekdays = {
        MONDAY: 'MÅNDAG',
        TUESDAY: 'TISDAG',
        WEDNESDAY: 'ONSDAG',
        THURSDAY: 'TORSDAG',
        FRIDAY: 'FREDAG',
        SATURDAY: 'LÖRDAG',
        SUNDAY: 'SÖNDAG'
    }
    test('should return correct localized weekday', () => {
        expect(getLocalizedWeekday('SATURDAY', weekdays)).toBe('LÖRDAG')
    })

    test('should return default day if no "weekdays" is supplied', () => {
        expect(getLocalizedWeekday('SATURDAY', undefined))
    })
})

describe('#isSelectable', () => {
    let conf = {}
    beforeEach(() => {
        conf.displayDate = LocalDate.parse('2018-05-01')
        conf.selectedStartDate = undefined
        conf.selectedEndDate = undefined
        conf.allowedStartDate = undefined
        conf.allowedEndDate = undefined
    })
    afterEach(() => {
        conf = {}
    })

    test('should be selectable if no allowedRange set', () => {
        expect(isSelectable(LocalDate.parse('2018-05-11'), conf)).toBe(true)
    })

    test('should be isSelectable = true, if only allowedStartDate is set and date is same', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedStartDate = aDate
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if only allowedStartDate is set and date is before', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedStartDate = aDate.plusDays(3)
        expect(isSelectable(aDate, conf)).toBe(false)
    })

    test('should be isSelectable = true, if only allowedStartDate is set and date is after', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedStartDate = aDate.minusDays(3)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = true, if only allowedEndDate is set and date is before', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedEndDate = aDate.plusDays(2)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if only allowedEndDate is set and date is after', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedEndDate = aDate.minusDays(2)
        expect(isSelectable(aDate, conf)).toBe(false)
    })

    test('should be isSelectable = true, if allowedEndDate & allowedStartDate & date is within', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedEndDate = aDate.plusDays(2)
        conf.allowedStartDate = aDate.minusDays(10)
        expect(isSelectable(aDate, conf)).toBe(true)
    })

    test('should be isSelectable = false, if allowedEndDate & allowedStartDate & date is outside', () => {
        const aDate = LocalDate.parse('2018-05-11')
        conf.allowedEndDate = aDate.minusDays(2)
        conf.allowedStartDate = aDate.minusDays(10)
        expect(isSelectable(aDate, conf)).toBe(false)
    })
})

describe('#isWithinRange', () => {
    let selectedStartDate
    let selectedEndDate

    test('should return true if date is same as selectedStartDate/selectedEndDate or inbetween', () => {
        selectedStartDate = LocalDate.parse('2018-05-10')
        selectedEndDate = LocalDate.parse('2018-05-20')
        expect(isWithinRange(LocalDate.parse('2018-05-10'), selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange(LocalDate.parse('2018-05-20'), selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange(LocalDate.parse('2018-05-11'), selectedStartDate, selectedEndDate)).toBe(true)
        expect(isWithinRange(LocalDate.parse('2018-05-08'), selectedStartDate, selectedEndDate)).toBe(false)
    })
    test('should return true if date is same as selectedStartDate, even though selectedEndDate is undefined', () => {
        selectedStartDate = LocalDate.parse('2018-05-10')
        selectedEndDate = undefined
        expect(isWithinRange(LocalDate.parse('2018-05-10'), selectedStartDate, selectedEndDate)).toBe(true)
    })
    test('should return false if date is not same as selectedStartDate, when selectedEndDate is undefined', () => {
        selectedStartDate = LocalDate.parse('2018-05-10')
        selectedEndDate = undefined
        expect(isWithinRange(LocalDate.parse('2018-05-11'), selectedStartDate, selectedEndDate)).toBe(false)
    })
})

describe('#populateMonthDisplay', () => {
    let conf = {}
    beforeEach(() => {
        conf.displayDate = LocalDate.parse('2018-05-01')
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
        conf.allowedStartDate = LocalDate.parse('2017-05-01')
        conf.allowedEndDate = LocalDate.parse('2018-05-11')
        expect(populateMonthDisplay(conf)[0][0].unselectable).toBe(false)
    })

    test('entry outside of allowedrange should have "unselectable: true"', () => {
        conf.allowedStartDate = LocalDate.parse('2017-05-01')
        conf.allowedEndDate = LocalDate.parse('2017-05-11')
        expect(populateMonthDisplay(conf)[0][0].unselectable).toBe(true)
    })

    describe('selectedRange', () => {
        beforeEach(() => {
            conf.selectedStartDate = LocalDate.parse('2018-05-01')
            conf.selectedEndDate = LocalDate.parse('2018-05-11')
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

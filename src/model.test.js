import { LocalDate } from 'js-joda'

import {
    firstWeekDay,
    isSelectable,
    parseWeekFromDay1,
    populateMonthDisplay
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

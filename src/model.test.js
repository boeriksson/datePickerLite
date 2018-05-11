import { LocalDate } from 'js-joda'

import {
    firstWeekDay,
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

    test('entry in allowedRange should have "allowed: true"', () => {
        conf.allowedStartDate = LocalDate.parse('2017-05-01')
        conf.allowedEndDate = LocalDate.parse('2018-05-11')
        expect(populateMonthDisplay(conf)[0][0].allowed).toBe(true)
    })

    test('entry outside of allowedrange should have "allowed: false"', () => {
        conf.allowedStartDate = LocalDate.parse('2017-05-01')
        conf.allowedEndDate = LocalDate.parse('2017-05-11')
        expect(populateMonthDisplay(conf)[0][0].allowed).toBe(false)
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

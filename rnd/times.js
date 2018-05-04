const times = x => f => {
    if (x > 0) {
        f()
        times(x -1 )(f)
    }
}

times (3) (() => console.log('hi'))

const titer = n => f => {
    let iter = i => {
        if(i === n) return
        f(i)
        iter(i + 1)
    }
    return iter (0)
}

titer (3) (i => console.log(i, 'hi'))


const repeat = n => f => {
    if (n > 0) {
        f()
        repeat(n - 1)(f)
    }
}

repeat(3)(() => console.log('hello'))


const repeat2 = (n, i = 1) => f => {
    if (n > 0 && i < n + 1) {
        f(i)
        repeat2(n, i + 1)(f)
    }
}

repeat2(3)(j => console.log('keff: ', j))


const forEachWeekDay = (startDate, dayNo = 1) => f => {
    if (dayNo <= 7) {
        f(dayNo)
        forEachWeekDay(startDate, dayNo + 1)(f)
    }
}

forEachWeekDay('kalle')(day => console.log('day: ', day))

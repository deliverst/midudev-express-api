const {average} = require('./testing')

describe.skip('average', () => {
    test('of one value is the value itsef', () => {
        expect(average([1])).toBe((1))
    })

    test('average calcualte correctly', () => {
        expect(average([1, 2, 3, 4, 5, 6])).toBe((3.5))
    })

    test('average calcualte correctly', () => {
        expect(average([])).toBe((0))
    })

    test('test with undefined', () => {
        expect(average()).toBeUndefined()
    })
})

const {palindrome} = require('./testing')

test('test of palindrome', () =>{
    const result = palindrome('midudev')
    expect(result).toBe('vedudim')
})


test('palindrome empty', ()=> {
    const result = palindrome('')
    expect(result).toBe('')
})

test('palindrome undefined', () =>{
    const result = palindrome()
    expect(result).toBeUndefined()
})
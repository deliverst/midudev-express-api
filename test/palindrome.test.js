const {palindrome} = require('./testing')

test.skip('test of palindrome', () =>{
    const result = palindrome('midudev')
    expect(result).toBe('vedudim')
})


test.skip('palindrome empty', ()=> {
    const result = palindrome('')
    expect(result).toBe('')
})

test.skip('palindrome undefined', () =>{
    const result = palindrome()
    expect(result).toBeUndefined()
})
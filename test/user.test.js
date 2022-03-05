const User = require('../src/models/User')
const bcrypt = require('bcrypt');
const {api, closeAllConnections, getUsers} = require('./helpers');

describe('Creating one user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("pass", 10)
        const user = new User({name: 'Javier', username: 'deliverst', passwordHash})
        await user.save()
    })

    test('Works as expectet creating a fresh username', async () => {
        const userAtStart = await getUsers()
        console.log(userAtStart)

        const newUser = {
            username: 'ragnarok',
            name: 'rogelio',
            password: 'tw1tch'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()
        console.log(usersAtEnd)
        expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
        closeAllConnections()
    })


});

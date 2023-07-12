const request = require('supertest')
const User = require('../../server/model/user');
const { makeUsername } = require('../../server/utils/shared.module');

let server;

describe("/user", () => {
    let user = {};

    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        server.close();
        await User.deleteOne(user)
    })

    describe('/Get', () => {
        it('should return user detail with token on login', async () => {
            user.number = Math.floor(Math.random() * 1000000000);
            user.username = makeUsername(5);
            user.pin = makeUsername(5);
            const payload = {
                "first_name": user.username,
                "last_name": "",
                "phone": user.number,
                "username": user.username,
                "pin": user.pin
            };
            User(payload).save();
            const res = await request(server).post('/user/authenticate')
                .send({
                    "username": user.username,
                    "pin": user.pin
                })
            expect(res.statusCode).toBe(200)
            expect(res.body.data).not.toBeNull()
            expect(res.body.data).toHaveProperty('token')
            expect(res.body.data).toHaveProperty('user')
            expect(res.body.data.user).toHaveProperty('_id')
            expect(res.body.data.user.username).toBe(user.username)
        })

    })
})
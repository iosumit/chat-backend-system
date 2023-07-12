const { CONFIG } = require("../../env")
const jwt = require('jsonwebtoken')
const auth = require('../../server/utils/authorization.token')
const mongoose = require("mongoose")

describe("authorization.token", () => {

    it("Should Return JWT", () => {

        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            first_name: "result.first_name",
            last_name: "result.last_name",
            created_at: "result.created_at",
            username: "result.username"
        }

        const token = auth.createToken(payload);
        const decoded = jwt.verify(token, CONFIG.SERVER_AUTH_TOKEN_SECRET);
        expect(decoded).toMatchObject(payload);
    })
})
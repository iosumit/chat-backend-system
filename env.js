const CONFIG = {
    ENVIROMENT_TYPE: process.env.ENVIROMENT_TYPE || '',
    SERVER_AUTH_TOKEN_SECRET: process.env.SERVER_AUTH_TOKEN_SECRET || '',
    MONGO_URI: process.env.MONGO_URI || ""
}

module.exports = {
    CONFIG
}
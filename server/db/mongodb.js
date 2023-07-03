const mongoose = require('mongoose')
const { CONFIG } = require('../../env');

async function run() {
    try {
        console.log("Pinging to MongoDB!");
        await mongoose.connect(CONFIG.MONGO_URI, { useNewUrlParser: true, dbName: 'chatio' }).then(() => console.log("Pinged your deployment. You successfully connected to MongoDB!")).catch(e => console.log("DB connection failed", e));
    } finally {

    }
}
module.exports = run().catch("Failed", console.dir);
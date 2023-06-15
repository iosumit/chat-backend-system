const async = require('async');

function getChannels(input, next) {
    async.series([

    ])
}

function getObjectByQuery(filters, next) {
    User.findOne(filters.query)
        .select(filters.selectFrom ? filters.selectFrom : {})
        .lean()
        .then((result) => next(null, result))
        .catch((err) => next(err));
}

module.exports = {
    getChannels
}
const async = require('async');
const Channel = require('../model/channel');
const { strings } = require('../utils/strings')



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

const createChannels = (input, next) => {
    console.log(`Here is input ${JSON.stringify(input)}`);
    let modelName = {};
    // return;
    async.series([
        cb => {
            const channel = new Channel(input);

            channel.save().then(result => {
                modelName.channel = result;
                return cb();
            })
                .catch(err => {

                    return cb(strings.unable_to_create_channel_at_this_moment);
                })

        }
    ], err => {
        if (err) {
            next(err);

        } else {
            next(null, modelName)
        }
    });

}

module.exports = {
    getChannels, createChannels, getObjectByQuery
}
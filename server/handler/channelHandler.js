const async = require('async');
const Channel = require('../model/channel');
const { strings } = require('../utils/strings');
// const { result } = require('lodash');



function getChannels(input, next) {
    var modelName = {};

    async.series([
        cb => {

            const query = { participated_users: input._id, active: true, is_deleted: false };
            getObjectByQuery({ query }, (err, result) => {
                if (err) {
                    return cb(strings.unseccessful_attempt);

                } else {
                    modelName = result;
                    return cb();
                }

            });
        }
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

function getObjectByQuery(filters, next) {
    Channel
        .find(filters.query)
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
    getChannels, createChannels
}
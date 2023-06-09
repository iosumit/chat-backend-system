const mongoose = require('mongoose');
const { CHANNEL_TYPE, SCHEMA } = require('../utils/consts');

const channelSchema = mongoose.Schema({
    name: String,
    participated_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: SCHEMA.Channel,
            require: true,
        }
    ],
    type: {
        type: String,
        enum: [CHANNEL_TYPE.group, CHANNEL_TYPE.single],
        default: CHANNEL_TYPE.single
    },
    profile_image_url: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model(SCHEMA.Channel, channelSchema);




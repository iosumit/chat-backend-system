const mongoose = require('mongoose');
const { SCHEMA, MessageType } = require('../utils/consts');

const messageSchema = mongoose.Schema({
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tagded_user: [mongoose.Schema.Types.ObjectId],
    message: String,
    type: {
        type: String,
        enum: [MessageType.Text, MessageType.File, MessageType.Both]
    },
    file_urls: [String],
    seen_by: [mongoose.Schema.Types.ObjectId],
    is_deleted_by_user: {
        type: Boolean,
        default: true
    },
    is_updated_by_user: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model(SCHEMA.Message, messageSchema);




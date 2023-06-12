const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    phone: { type: Number, unique: true },
    profile_image_url: String,
    username: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
userSchema.set('versionKey', false);
module.exports = mongoose.model('User', userSchema);
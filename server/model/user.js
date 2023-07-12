const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
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
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })
module.exports = mongoose.model('User', userSchema);
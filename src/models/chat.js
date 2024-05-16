const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        id: String,
        username: String,
        first_name: String,
        language_code: String,
        usage: Number,
        subscribed: Boolean,
    },
    { timestamps: true }
);

mongoose.model('chat', chatSchema);

module.exports = mongoose.model('chat');
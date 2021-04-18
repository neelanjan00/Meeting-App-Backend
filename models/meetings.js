const mongoose = require('mongoose')

const meetingsSchema = new mongoose.Schema({
    meetingName: {
        type: String,
        required: true
    },
    numberOfPeopleAttending: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('meetings', meetingsSchema)
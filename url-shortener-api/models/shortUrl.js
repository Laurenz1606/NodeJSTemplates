//dependencies
const mongoose = require('mongoose')
const shortId = require('shortid')

//create the database model
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: () => shortId.generate()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

//export the module
module.exports = mongoose.model('ShortUrl', shortUrlSchema)
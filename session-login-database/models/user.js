//dependencies
const mongoose = require('mongoose')

//create the database model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

//export the module
module.exports = mongoose.model('User', userSchema)

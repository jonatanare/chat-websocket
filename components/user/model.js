const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String
},{
    timestamps: true
})

const model = mongoose.model('User', mySchema)
module.exports = model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const adminSchema = new Schema ({

})

adminSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('admin', adminSchema)
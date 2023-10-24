const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mesajSchema = new Schema ({
    contAdmin : {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    nume : {
        type: String,
        required: true
    },
    prenume : {
        type: String,
        required: true
    },
    telefon : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    continut : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('mesaj', mesajSchema)
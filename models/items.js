const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    contAdmin : {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    nume : {
        type: String,
        required: true
    },
    pret : {
        type: Number,
        required: true
    },
    descriere : {
        type: String,
        required: true
    },
    clasa : {
        type: String,
        required: true
    },
    poza : {
        type: String,
        required: true
    },
    stoc : {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('item', itemSchema)
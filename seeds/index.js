const mongoose = require('mongoose')
const Item = require('../models/items')
const produse = require('./produse.js')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/copytech', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error.bind(console, "connection error:"))
mongoose.connection.once("open", () => {
    console.log("Database connected")
})

const seedDB = async() => {
    await Item.deleteMany({})
    for(let i = 0; i < 27; i++){
        let nr = Math.floor(Math.random()*20) +5
        const item = new Item({
            contAdmin: '63ea4eb88aba1ffd47da3d97',
            nume : `${produse[i].nume}`,
            pret : `${produse[i].pret}`,
            descriere : `${produse[i].descriere}`,
            clasa : `${produse[i].clasa}`,
            poza : `${produse[i].imagine}`,
            stoc : nr,
        })
        await item.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
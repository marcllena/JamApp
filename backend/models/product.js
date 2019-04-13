'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte 
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: {type:Number, default: 0 },
    category: {type: String, enum:['computer','phone','accesories'] },
    description: String,
})

module.exports = mongoose.model('Product',ProductSchema)
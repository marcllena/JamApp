'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User= require('./user')


const GroupSchema = Schema({
    name: String,
    email: {type: String, unique: true, lowercase:true},
    fotoGrup: String,
    integrants:[User],
    ubicacio:String,
    description: String,
    video:String,
    estils:[String],
})

module.exports = mongoose.model('Group',GroupSchema)

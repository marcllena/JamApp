'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari
 */
const mongoose = require('mongoose')
const Group = require('./group')
const UserBase = require('./user')

const MusicianSchema = UserBase.discriminator('Musician', new mongoose.Schema({
    fotoPerfil: String,
    instrument:[String],
    ubicacio:String,
    coordenades:[Number],
    descripcio:String,
    video:String,
    estils:[String]
}))

module.exports= mongoose.model('Musician')
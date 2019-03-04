'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = Schema({
    name: String,
    estils:[String],
    participantsSolistes:[User],
    participantsGrups: [Group],
    email: {type: String, unique: true, lowercase:true},
    fotoGrup: Image,
    ubicacio:String,
    description: String,
    video:String,

})

module.exports = mongoose.model('Jam',ProductSchema)

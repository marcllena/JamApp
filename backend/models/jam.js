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
    dataIntencio: Date,
    dataConfirmda: Date,
    local:String,
    description: String,
    organitzador:User,

})

module.exports = mongoose.model('Jam',ProductSchema)

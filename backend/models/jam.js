'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require('./group');
const User= require('./user');


const GroupSchema = Schema({
    name: String,
    estils:[String],
    participantsSolistes:[User],
    participantsGrups: [Group],
    dataIntencio: Date,
    dataConfirmda: Date,
    local:{ type: Schema.Types.ObjectId, ref: 'Room' },
    description: String,
    organitzador:User,

});

module.exports = mongoose.model('Jam',JamSchema)

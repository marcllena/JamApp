'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require('./group');
const User= require('./user');


const JamSchema = Schema({
    name: String,
    estils:[String],
    //participantsSolistes:[{ type: Schema.Types.ObjectId, ref: 'Musician' }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dataIntencio: Date,
    dataConfirmda: Date,
    local:{ type: Schema.Types.ObjectId, ref: 'Room' },
    description: String,
    organitzador:{ type: Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Jam',JamSchema);

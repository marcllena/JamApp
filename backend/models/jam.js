'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require('./group');
const User= require('./user');
const Room= require('./room');

const config = require('../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.SECRET_TOKEN);


const JamSchema = Schema({
    name: String,
    estils:[String],
    participantsSolistes:[{ type: Schema.Types.ObjectId, ref: 'Musician' }],
    participantsGrups:[{ type: Schema.Types.ObjectId, ref: 'Group' }],
    //participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dataIntencio: Date,
    dataConfirmda: Date,
    local:{ type: Schema.Types.ObjectId, ref: 'Room' },
    description: String,
    organitzador:{ type: Schema.Types.ObjectId, ref: 'User' },
    localName: String,

});

JamSchema.set('toJSON', {
    //virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret._id = cryptr.encrypt(ret._id);

        ret.participantsSolistes.forEach(function (solista, i) {
            ret.participantsSolistes[i] = cryptr.encrypt(solista)
        });

        ret.participantsGrups.forEach(function (grup, i) {
            ret.participantsGrups[i] = cryptr.encrypt(grup)
        });

        ret.local=cryptr.encrypt(ret.local);

        ret.organitzador=cryptr.encrypt(ret.organitzador);
    }
});

module.exports = mongoose.model('Jam',JamSchema);

'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari
 */
const mongoose = require('mongoose');
const UserBase = require('./user');
const Schema = mongoose.Schema;
const PointSchema = require('./point');

const RoomSchema = UserBase.discriminator('Room', new mongoose.Schema({
    fotoPerfil: String,
    city: String,
    location: {type: PointSchema.schema},
    latitud: Number,
    longitud: Number,
    //coordenades:[Number],
    descripcio: String,
    jams: [{ type: Schema.Types.ObjectId, ref: 'Jam' }],
}));

module.exports= mongoose.model('Room');
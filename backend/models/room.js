'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari
 */
const mongoose = require('mongoose');
const UserBase = require('./user');
const Schema = mongoose.Schema;

const RoomSchema = UserBase.discriminator('Room', new mongoose.Schema({
    fotoPerfil: String,
    city: String,
    latitud: Number,
    longitud: Number,
    //coordenades:[Number],
    descripcio: String,
    jams: [{ type: Schema.Types.ObjectId, ref: 'Jam' }],
}));

module.exports= mongoose.model('Room');
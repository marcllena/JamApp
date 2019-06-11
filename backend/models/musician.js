'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari
 */
const mongoose = require('mongoose');
const Group = require('./group');
const UserBase = require('./user');
const Point = require('./point');

const MusicianSchema = UserBase.discriminator('Musician', new mongoose.Schema({
    fotoPerfil: String,
    instrument:[{type: String, enum:['Guitarra','Piano','Pito','Triangle','Bateria','Violi','Veu','Teclat','Cello','Flauta'] }],
    city: String,
    //coordenades:[Number],
    location: {type: Point.schema},
    latitud: Number,//+-90
    longitud: Number,//+-180
    grups: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]],
    //jams: [{ type: Schema.Types.ObjectId, ref: 'Jam' }],
    descripcio:String,
    video:String,
    estils:[String]
}));

module.exports= mongoose.model('Musician');
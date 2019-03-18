'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Usuari
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const extendSchema = require('mongoose-extend-schema')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const Group = require('./group')
const User = require('./user')


const MusicianSchema = extendSchema(User.UserSchema,{
    //instrument:[String],
    description:{type:String}//,
    //video:String,
    //estils:[String],
})

module.exports = mongoose.model('Musician',MusicianSchema)
'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: String,
    Date: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Message',MessageSchema);
'use strict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConverSchema = Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [{from: String, message: String}],
});

module.exports = mongoose.model('Conver',ConverSchema);
'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConverSchema = Schema({
    name: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messages: [String] = null,
});

module.exports = mongoose.model('Conver',ConverSchema);
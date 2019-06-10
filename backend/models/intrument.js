'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstrumentSchema = Schema({
    name: {type: String, unique: true},
})

module.exports = mongoose.model('Instrument',InstrumentSchema)
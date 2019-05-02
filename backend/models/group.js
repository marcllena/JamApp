'use scrict'
/*
Esquema de la base de dades amb els camps que pot tindre cada Producte
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Musician= require('./musician')

/*No té sentit un grup sense un músic, així que el controlador per gestionar els grups 
els posare al controlador dels músics.*/
const GroupSchema = Schema({
    name: String,
    email: {type: String, unique: true, lowercase:true},
    fotoGrup: String,
    integrants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Musician'}],
    solicituds: [{id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Musician'}], missatge: String}],
    latitud: Number,
    longitud: Number,
    description: String,
    video:String,
    estils:[String],
})

module.exports = mongoose.model('Group',GroupSchema)

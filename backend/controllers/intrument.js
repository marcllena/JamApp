'use strict'

/*
On estan implementades totes les operacions de instrumentes. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
*/

const Instrument = require('../models/instrument')

function getInstrument (req,res){
    console.log('GET /api/instrument/:instrumentId')

    let instrumentId = req.params.instrumentId
  
    Instrument.findById(instrumentId,(err, instrument) => {
        if(err) 
        return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  
        if(!instrument)
        return res.status(404).send({message: `El instrumento no existe`})
  
        res.status(200).send({instrument: instrument})
    })
}

function getInstruments (req,res){
    console.log('GET /api/instrument/')

    Instrument.find({},(err, instruments) => {
      if(err)
      return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  
      if(!instruments)
        return res.status(404).send({message: `No existen instrumentos`})
        
        res.status(200).send({instruments})
    })
}

function saveInstrument(req,res){
    console.log('POST /api/instrument')
    console.log(req.body)

    let instrument = new Instrument()
    instrument.name = req.instrumentName[0].toUpperCase() + req.instrumentName.substring(1)
    instrument.save((err,instrumentStored) => {
        if(err)
        return es.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({instrument: instrumentStored})

    })
}

function updateInstrument (req,res){
    console.log('PUT /api/instrument/:instrumentId')

    let instrumentId = req.params.instrumentId
    let update = req.body
  
    Instrument.findByIdAndUpdate(instrumentId,update,(err, instrumentUpdated) => {
        if(err) 
        return res.status(500).send({message: `Error al actualizar el instrumento: ${err}`})
  
        if(!instrumentUpdated)
        return res.status(404).send({message: `El instrumento no existe`})
  
        res.status(200).send({instrument: instrumentUpdated})
        })
}

function deleteInstrument (req,res){
    console.log('DELETE /api/instrument/:instrumentId')

    let instrumentId = req.params.instrumentId
  
    Instrument.findById(instrumentId,(err, instrument) => {
        if(err) 
        return res.status(500).send({message: `Error al borrar el instrumento: ${err}`})
  
        if(!instrument)
        return res.status(404).send({message: `El instrumento no existe`})
  
        instrument.remove(err =>{ 
            if(err)
            return res.status(500).send({message: `Error al borrar el instrumento: ${err}`})
  
            res.status(200).send({message: "El instrumento se ha eliminado correctamente"})
        })
    })
}

module.exports = {
    getInstrument,
    getInstruments,
    saveInstrument,
    updateInstrument,
    deleteInstrument,
    
}

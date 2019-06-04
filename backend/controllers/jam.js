'use strict'

/*
On estan implementades totes les operacions de jams. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
*/

const Jam = require('../models/jam');
const mongoose = require('mongoose');
const User = require('../models/user');

function getJam (req,res){
    console.log('GET /api/jam/:idJam');

    let jamId = req.params.idJam;
  
    Jam.findById(jamId,(err, jam) => {
        if(err) 
        return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
  
        if(!jam)
        return res.status(404).send({message: `El jamo no existe`});
  
        res.status(200).send({jam: jam})
    })
}

function getJams (req,res){
    console.log('GET /api/jam/');

    Jam.find({},(err, jams) => {
      if(err)
      return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
  
      if(!jams)
        return res.status(404).send({message: `No existen jamos`});
        
        res.status(200).send({jams})
    })
}

function saveJam(req,res){
    console.log('POST /api/jam');
    console.log(req.body);

    let jam = new Jam();
    jam.name = req.body.name;
    jam.price = req.body.price;
    jam.dataIntencio = req.body.dataIntencio;
    jam.description = req.body.description;
    jam.local = req.body.room;
    jam.organitzador=req.user;
    
    jam.save((err,jamStored) => {
        if(err)
        return es.status(500).send({message: `Error al salvar en la base de datos: ${err}`});

        res.status(200).send({jam: jamStored})

    })
}

function updateJam (req,res){
    console.log('PUT /api/jam/:jamId');

    let jamId = req.params.jamId;
    let update = req.body;
  
    Jam.findByIdAndUpdate(jamId,update,(err, jamUpdated) => {
        if(err) 
        return res.status(500).send({message: `Error al actualizar el jamo: ${err}`});
  
        if(!jamUpdated)
        return res.status(404).send({message: `El jamo no existe`});
  
        res.status(200).send({jam: jamUpdated})
        })
}

function deleteJam (req,res){
    console.log('DELETE /api/jam/:jamId');

    let jamId = req.params.jamId;
  
    Jam.findById(jamId,(err, jam) => {
        if(err) 
        return res.status(500).send({message: `Error al borrar el jamo: ${err}`});
  
        if(!jam)
        return res.status(404).send({message: `El jamo no existe`});
        
        if (req.user==jam.organitzador)
  
        jam.remove(err =>{ 
            if(err)
            return res.status(500).send({message: `Error al borrar el jamo: ${err}`});
  
            res.status(200).send({message: "El jamo se ha eliminado correctamente"})
        })
    })
}


function removeMember (req,res){
    User.findById(req.params.idMember, (err, user) => {
        if (err)
            return res.status(500).send({message: `Error searching users: ${err}`});

        if (!user)
            return res.status(400).send({message: `The user does not exist`});

        Jam.update({_id: req.params.idJam},{$pull:{participants: req.params.idMember}}, (err, doc)=>{
            if (err)
                return res.status(500).send({message: `Error updating jam: ${err}`});

            if (!doc)
                return res.status(400).send({message: `Jam does not exist`});

            Jam.findById(req.params.idJam, (err, jam) =>{
                if (err)
                    return res.status(500).send({message: `Error searching jam: ${err}`});
                return res.status(200).send(jam)
            })
        })
    })
}

module.exports = {
    getJam,
    getJams,
    saveJam,
    updateJam,
    deleteJam,
    removeMember
    
};

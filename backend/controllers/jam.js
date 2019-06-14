'use strict'

/*
On estan implementades totes les operacions de jams. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
*/


const Jam = require('../models/jam');
const mongoose = require('mongoose');
const User = require('../models/user');
const Group = require('../models/group');
const Room = require('../models/room');
const config = require('../config');

const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.SECRET_TOKEN);


function getJam (req,res){
    console.log('GET /api/jam/:idJam');

    let jamId;
    try {
        jamId = cryptr.decrypt(req.params.idJam);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
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

      if(jams.length==0)
        return res.status(404).send({message: `No existen jams`});

        res.status(200).send(jams)
    })
}


function saveJam(req,res){
    console.log('POST /api/jam');
    console.log(req.body);

    let jam = new Jam();
    let salaError = false;


    if('local' in req.body){
        try {
            jam.local = cryptr.decrypt(req.body.local);
        }
        catch(error) {

            salaError = true;
            //eturn res.status(500).send({message: `Error on the ID sala`});
        }

        //jam.local = req.body.local;
        jam.localName = "";

    }else{
        return res.status(500).send({message: 'Place unspecified'})
    }
    let query={}

    if (salaError===true){
        query['username']=req.body.local;
    }else{
        query['_id']=jam.local;
    }

    jam.name = req.body.name;
    //jam.price = req.body.price;
    jam.dataIntencio = req.body.dataIntencio;
    jam.description = req.body.description;
    jam.organitzador = req.user;

    Room.find(query,(err, room) => {
        if(err)
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(room.length==0){
            return res.status(404).send({message: `Sala no encontrada: ${err}`});
        }

        jam.localName=room[0].username;
        jam.local=room[0]._id;

        jam.save((err,jamStored) => {
            if(err)
                return res.status(500).send({message: `Error al salvar en la base de datos: ${err}`});

            room[0].jams.push(jam);

            room[0].save((err)=>{
                if(err)
                    return res.status(500).send({message: `Error al salvar en la base de datos: ${err}`});

                res.status(200).send({jam: jamStored})
            })


        })
    });

}

function updateJam (req,res){
    console.log('PUT /api/jam/:jamId');

    let jamId;

    try {
        jamId = cryptr.decrypt(req.params.jamId);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    let update = req.body;

    User.findbyId(req.user,(err,user)=> {
        if (err) return res.status(500).send({message: `Error al borrar la jam: ${err}`});
        if (!user) return res.status(404).send({message: 'Error al encontrat jam'});


        Jam.findById(jamId, (err, jam) => {
            if (err)
                return res.status(500).send({message: `Error al actualizar la jam: ${err}`});

            if (!jam)
                return res.status(404).send({message: `Esta jam no existe`});

            if ((user.userType != 'Admin') && (jam.organitzador != user._id)) {
                return res.status(403).send({message: 'Forbidden'})
            }

            Jam.findByIdAndUpdate(jamId, update, (err, jamUpdated) => {
                if (err)
                    return res.status(500).send({message: `Error al actualizar el jamo: ${err}`});

                if (!jamUpdated)
                    return res.status(404).send({message: `El jamo no existe`});

                res.status(200).send({jam: jamUpdated})
            })
        })
    })
}

function deleteJam (req,res){
    console.log('DELETE /api/jam/:jamId');

    let jamId;
    try {
        jamId = cryptr.decrypt(req.params.jamId);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    User.findbyId(req.user,(err,user)=>{
        if (err) return res.status(500).send({message: `Error al borrar la jam: ${err}`});
        if (!user) return res.status(404).send({message: 'Error al encontrat jam'});


        Jam.findById(jamId,(err, jam) => {
            if(err)
                return res.status(500).send({message: `Error al borrar la jam: ${err}`});

            if(!jam)
                return res.status(404).send({message: `Esta jam no existe`});

            if((user.userType!='Admin')&&(jam.organitzador!=user._id)){
                return res.status(403).send({message: 'Forbidden'})
            }

            if (req.user==jam.organitzador)

                jam.remove(err =>{
                    if(err)
                        return res.status(500).send({message: `Error removing jam: ${err}`});

                    res.status(200).send({message: "Jam removed correctly"})
                })
        })

    });

}


function removeMember (req,res){
    let memberId;
    let jamId;
    try {
        memberId = cryptr.decrypt(req.params.idMember);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    try {
        jamId = cryptr.decrypt(req.params.idJam);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    User.findById(memberId, (err, user) => {
        if (err)
            return res.status(500).send({message: `Error searching member: ${err}`});

        if (!user){
            Group.findById(memberId, (err,grup)=>{
                if (err)
                    return res.status(500).send({message: `Error searching member: ${err}`});
                if(!grup){
                    return res.status(400).send({message: `The user does not exist`});
                }

                Jam.update({_id: jamId},{$pull:{participantsSolistes: memberId}}, (err, doc)=>{
                    if (err)
                        return res.status(500).send({message: `Error updating jam: ${err}`});

                    if (!doc)
                        return res.status(400).send({message: `Jam does not exist`});

                    Jam.findById(jamId, (err, jam) =>{
                        if (err)
                            return res.status(500).send({message: `Error searching jam: ${err}`});
                        return res.status(200).send(jam);
                    })
                })
            });

        }

        Jam.update({_id: jamId},{$pull:{participantsSolistes: memberId}}, (err, doc)=>{
            if (err)
                return res.status(500).send({message: `Error updating jam: ${err}`});

            if (!doc)
                return res.status(400).send({message: `Jam does not exist`});

            Jam.findById(jamId, (err, jam) =>{
                if (err)
                    return res.status(500).send({message: `Error searching jam: ${err}`});
                return res.status(200).send(jam);
            })
        })
    })
}

function addMember (req,res){
    let memberId;
    let jamId;
    try {
        memberId = cryptr.decrypt(req.params.idMember);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    try {
        jamId = cryptr.decrypt(req.params.idJam);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    User.findById(memberId, (err, user) => {
        if (err)
            return res.status(500).send({message: `Error searching member: ${err}`});

        if (!user){
            Group.findById(memberId, (err,grup)=>{
                if (err)
                    return res.status(500).send({message: `Error searching member: ${err}`});
                if(!grup){
                    return res.status(400).send({message: `The user does not exist`});
                }

                Jam.update({_id: jamId},{$push:{participantsSolistes: memberId}}, (err, doc)=>{
                    if (err)
                        return res.status(500).send({message: `Error updating jam: ${err}`});

                    if (!doc)
                        return res.status(400).send({message: `Jam does not exist`});

                    Jam.findById(jamId, (err, jam) =>{
                        if (err)
                            return res.status(500).send({message: `Error searching jam: ${err}`});
                        return res.status(200).send(jam);
                    })
                })
            });

        }

        Jam.update({_id: jamId},{$push:{participantsSolistes: memberId}}, (err, doc)=>{
            if (err)
                return res.status(500).send({message: `Error updating jam: ${err}`});

            if (!doc)
                return res.status(400).send({message: `Jam does not exist`});

            Jam.findById(jamId, (err, jam) =>{
                if (err)
                    return res.status(500).send({message: `Error searching jam: ${err}`});
                return res.status(200).send(jam);
            })
        })
    })
}

function getJamsfromOwner (req,res){
    console.log('GET /api/jam/byOwner/:idUser');

    let userId=req.user;
    /*try {
        userId = cryptr.decrypt(req.params.idUser);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
*/
    Jam.find({organitzador: userId},(err, jam) => {
        if(err)
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});

        if(!jam)
            return res.status(404).send({message: `No hi han jams`});

        res.status(200).send(jam)
    })

}

function getParticipants(req,res){
    console.log('GET /api/jam/participants/:idJam');

    let jamId;
    try {
        jamId = cryptr.decrypt(req.params.idJam);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    Jam.findById(jamId,(err, jam) => {
        if(err)
            return res.status(500).send({message: `Error al realizar la peticion: ${err}`});

        if(!jam)
            return res.status(404).send({message: `El jamo no existe`});

        Group.find({'_id': {$in: jam.participantsGrups}},(err,grups)=>{
            if (err) return res.status(500).send({message: 'Internal error'});

            User.find({'_id': {$in: jam.participantsSolistes}},(err,usuaris)=>{
                if (err) return res.status(500).send({message: 'Internal error'});

                res.status(200).send({users: usuaris, groups: grups});
            })
        });
    })
}

module.exports = {
    getJam,
    getJams,
    saveJam,
    updateJam,
    deleteJam,
    removeMember,
    addMember,
    getJamsfromOwner,
    getParticipants
    
};

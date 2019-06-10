'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Musician = require('../models/musician')
const User = require('../models/user')
const service = require('../services')
const Group = require('../models/group')

function getGroups(req, res){
    let userId;
    try {
        userId = cryptr.decrypt(req.params.userId);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    Musician.findById(userId, (err,user)=>{
        if(err)
            return res.status(500).send({message: `Error searching the user: ${err}`});
        if(user==null) return res.status(404).send({message: `User not found`});

        Group.find({ '_id': { $in: user.grups}}, function(err, grups){
            if(err)
                return res.status(500).send({message: `Error searching groups: ${err}`});
            if(grups.length!=0) return res.status(404).send({message: `There are no groups`});

            res.status(200).send({
                grups: grups
            });
        })

    })
}

function requestMembership(req, res){
    Group.findById(req.body.idGroup, (err,group)=>{
        if(err){
            return res.status(500).send({message: 'Error al buscar grup'})
        }
        else{
            let userId;
            if (req.params.userId) userId = cryptr.decrypt(req.params.userId);
            else userId = req.user;
            User.findById(userId, (err,u) => {
                console.log(u.username)
                group.solicituds.push({id: userId, missatge: req.body.message, username: u.username});
                group.save((err=>{
                    if(err) {
                        console.log("Error al guardar grup")
                        return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                    }
                    else { 
                        console.log("Solicitud guardada correctament");
                        return res.status(200).send({message: 'Request acceptat'})
                    }
                }))
            })
            
        }
    })
}

/*A la petició hi espero nom de l'usuari que vol crear el grup, nom del grup,
 estil/s que toquin i descripció,
la resta es farà en un altre mètode que sigui per editar el grup*/



module.exports={
    requestMembership,
    getGroups
}
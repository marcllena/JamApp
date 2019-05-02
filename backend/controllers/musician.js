'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Musician = require('../models/musician')
const User = require('../models/user')
const service = require('../services')
const Group = require('../models/group')

/*function signUp(req,res) {
    const musician = new Musician({
        email: req.body.email,
        username: req.body.displayName,
        instrument: req.instrument
    })

    musician.save((err) => {
        if(err)
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})


        res.status(200).send({token: service.createToken(musician)})
    })
}*/

function requestMembership(req, res){
    Group.findById(req.body.idGroup, (err,group)=>{
        if(err){
            return res.status(500).send({message: 'Error al buscar grup'})
        }
        else{
            group.solicituds.push({id: req.body.id, missatge: req.body.message});
            group.save((err=>{
                if(err) {
                    console.log("Error al guardar grup")
                    return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                }
                else { 
                    return res.status(200).send({message: 'Request acceptat'})
                }
            }))
        }
    })
}

/*A la petició hi espero nom de l'usuari que vol crear el grup, nom del grup,
 estil/s que toquin i descripció,
la resta es farà en un altre mètode que sigui per editar el grup*/



module.exports={
    //signUp,
    requestMembership/*,
    signIn*/
}
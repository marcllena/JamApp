'use strict'

/*
On estan implementades les operacions d'autentificació.
*/

const services = require('../services')
const mongoose = require('mongoose')
const Admin = require('../models/admin')
const User = require('../models/user')

function isAdmin(req,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: `No tienes autorización`})
    }
    const token = req.headers.authorization.split(" ")[1] //Bearer + token, per aixo poso [1]
    //console.log(token)
    services.decodeToken(token)
        .then(response =>{
            Admin.findById(response, function (err, admin) {
                if(err){
                    return res.status(403).send({message: `1.No tienes acceso`})}
                if(admin==null)
                    return res.status(403).send({message: `2.No tienes acceso`})
                req.user=response
                next()
            })
        })
        .catch(response=>{
            res.status(response.status)
        })

}


module.exports= isAdmin